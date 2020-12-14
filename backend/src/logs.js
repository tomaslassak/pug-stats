const Log = require("../models/log.js");
const Player = require("../models/player.js");

const fetch = require("node-fetch");
const mongoose = require("mongoose");
const SteamID = require('steamid');

async function isLogAlreadyInDB(log_id) {
  const log = await Log.find({ log_id: log_id });
  if (log.length > 0) return true; 
  else return false;
}

async function fetchLog(log_id) {
  try {
    const res = await fetch(`https://logs.tf/json/${log_id}`);
    const log_data = await res.json();

    return log_data;
  }
  catch (error) {
    console.log(error);
  }
}

async function storeLog(log_id, log_data) {
  const log = new Log({
    _id: new mongoose.Types.ObjectId(),
    log_id: log_id,
    data: log_data
  });

  try {
    await log.save();

    console.log(`Log #${log_id} saved into database.`);
  }
  catch (error) {
    console.log(error);
  }
}

function setPlayerListFromFetchedLog(log_data) {
  const player_list = [];
  
  for (let steamID3 in log_data.players) {
    const player = {
      steamID3: steamID3,
      total_time: 0,
      team: null,
      elo: null,
      new_elo: null
    }

    log_data.players[steamID3].class_stats.forEach(element => {
      player.total_time += element.total_time;
    });

    player.team = log_data.players[steamID3].team;
    
    player_list.push(player);
  }

  return player_list;
}

async function setPlayerListFromDB(player_list) {
  const docs = await Player
    .find({ steamID3: { $in: player_list.map(player => player.steamID3) } });
  
  player_list.forEach(player => {
    player.elo = 1600;
  });

  docs.forEach(item => {
    player_list.forEach(player => {
      if (player.steamID3 === item.steamID3) {
        player.elo = item.elo;
      }
    })
  });

  return player_list;
}

function createTeamLists(log_data, player_list) {
  let red = {
    players: [],
    avg_elo: null,
    chance_of_winning: null,
    elo_change: null,
    score: log_data.teams.Red.score,
    captain: {}
  }
  let blue = {
    players: [],
    avg_elo: null,
    chance_of_winning: null,
    elo_change: null,
    score: log_data.teams.Blue.score,
    captain: {}
  }

  player_list.forEach(player => {
    if (player.team === "Red") red.players.push(player);
    else blue.players.push(player);
  });

  return [red, blue];
}

function cutOffSubstitutePlayers(player_list) {
  player_list.sort((a, b) => b.total_time - a.total_time);
  player_list = player_list.slice(0, 6);
  
  return player_list;
}

async function updatePlayerStats(steamID3, new_elo, elo_change) {
  const sid = new SteamID(steamID3);

  try {
    await Player.update({ steamID3: steamID3 }, {
      $set: {
        steamID: sid.getSteam2RenderedID(),
        steamID3: steamID3,
        steamID64: sid.getSteamID64(),
        elo: new_elo,
        elo_change: elo_change
      },
      $inc: {
        games_total: 1
      }
    }, { upsert: true })

    // console.log(`Player's ${steamID3} Elo has been updated.`);
  }
  catch (error) {
    console.log(error);
  }
}

async function updatePlayerEloInLog(log_id, steamID3, elo, elo_change) {
  try {
    await Log.update({ log_id: log_id }, {
      $set: {
        ["data.players." + steamID3 + ".elo_before_game"]: elo,
        ["data.players." + steamID3 + ".elo_change"]: elo_change
      }
    })

    console.log(`Log #${log_id} Player's ${steamID3} Elo has been updated.`);
  }
  catch (error) {
    console.log(error);
  }
}

// cap
async function getCaptainEloFromDB(steamID3) {
  let doc = await Player.find({ steamID3: steamID3 });
  
  if (doc.length > 0 && doc[0].cap_elo) cap_elo = doc[0].cap_elo; //////////////
  else cap_elo = 1600;
  
  console.log(cap_elo)
  return cap_elo;
}

async function updateCaptainStats(steamID3, cap_new_elo, cap_elo_change) {
  try {
    await Player.update({ steamID3: steamID3 }, {
      $set: {
        cap_elo: cap_new_elo,
        cap_elo_change: cap_elo_change
      },
      $inc: {
        cap_games_total: 1
      }
    }, { upsert: true })

    console.log(`Captain's ${steamID3} Elo has been updated.`);
  }
  catch (error) {
    console.log(error);
  }
}

async function updateCaptainEloInLog(log_id, steamID3, cap_elo, cap_elo_change) {
  try {
    await Log.update({ log_id: log_id }, {
      $set: {
        ["data.players." + steamID3 + ".cap_elo_before_game"]: cap_elo,
        ["data.players." + steamID3 + ".cap_elo_change"]: cap_elo_change
      }
    })

    console.log(`Log #${log_id} Captain's ${steamID3} Elo has been updated.`);
  }
  catch (error) {
    console.log(error);
  }
}

exports.isLogAlreadyInDB = isLogAlreadyInDB;
exports.fetchLog = fetchLog;
exports.storeLog = storeLog;
exports.setPlayerListFromFetchedLog = setPlayerListFromFetchedLog;
exports.setPlayerListFromDB = setPlayerListFromDB;
exports.createTeamLists = createTeamLists;
exports.cutOffSubstitutePlayers = cutOffSubstitutePlayers;
exports.updatePlayerStats = updatePlayerStats;
exports.updatePlayerEloInLog = updatePlayerEloInLog;
exports.getCaptainEloFromDB = getCaptainEloFromDB;
exports.updateCaptainStats = updateCaptainStats;
exports.updateCaptainEloInLog = updateCaptainEloInLog;