const pugchamp = require("./pugchamp.js");
const etf2l = require("./etf2l.js");
const logs = require("./logs.js");
const elo = require("./elo.js");
const SteamID = require('steamid');

function updateDatabaseWithEtf2lPlayerNames() {
  etf2l.updateAllNames();
}

async function updateDatabaseWithPugchampPlayerNames() {
  player_data = await pugchamp.scrapePlayerData();

  for (let player of player_data) {
    pugchamp.updateName(player.steamID, player.alias);
  }
}

async function updateDatabaseWithNewGames() {
  // scraping game info from pugchamp
  // reversing the list so it starts with the oldest games played
  // maximum of 3 concurrent games on pugchamp
  let game_list = await pugchamp.scrapeListOfGames();
  game_list = game_list.filter(game => game.status === "completed");
  game_list = game_list.slice(0, 15).reverse();////////////
  
  // scraping log id from the game detail page on pugchamp
  // cutting of logs from the list that are already stored in db
  for await(let game of game_list) {
    game.log_id = await pugchamp.scrapeLogIDFromGame(game);
    game.isAlreadyInDB = await logs.isLogAlreadyInDB(game.log_id);
  }
  game_list = game_list.filter(game => !game.isAlreadyInDB);
  game_list = game_list.filter(game => game.log_id); ///////


  for await(let game of game_list) {
    // fetching log and saving it into db
    game.log_data = await logs.fetchLog(game.log_id);
    await logs.storeLog(game.log_id, game.log_data); ////////////

    // setting player_list with info from log and db
    let player_list = logs.setPlayerListFromFetchedLog(game.log_data);
    player_list = await logs.setPlayerListFromDB(player_list);

    // create red and blue team lists
    // and cut off players with the least played time
    // if there are more than 6 players in a team
    let [red, blue] = logs.createTeamLists(game.log_data, player_list);
    red.players = logs.cutOffSubstitutePlayers(red.players);
    blue.players = logs.cutOffSubstitutePlayers(blue.players);

    // averaging elo rating per team and calculating
    // as if it were two players against each other
    // elo_change is same for each member of the team
    red.avg_elo = elo.averageTeamElo(red.players);
    blue.avg_elo = elo.averageTeamElo(blue.players);

    [red.elo_change, blue.elo_change] = 
      elo.calculateElo(red.avg_elo, blue.avg_elo, red.score, blue.score, 32);

    red.players.forEach(player => {
      player.new_elo = player.elo + red.elo_change;
      logs.updatePlayerStats(player.steamID3, player.new_elo, red.elo_change);
      logs.updatePlayerEloInLog(game.log_id, player.steamID3, player.elo, red.elo_change);
    });
    blue.players.forEach(player => {
      player.new_elo = player.elo + blue.elo_change;
      logs.updatePlayerStats(player.steamID3, player.new_elo, blue.elo_change);
      logs.updatePlayerEloInLog(game.log_id, player.steamID3, player.elo, blue.elo_change);
    });


    // captain elo
    game.teams.forEach(team => {
      if (team.faction === "RED") {
        const sid = new SteamID(team.captain.steamID);
        red.captain.steamID3 = sid.getSteam3RenderedID();
      }
      if (team.faction === "BLU") {
        const sid = new SteamID(team.captain.steamID);
        blue.captain.steamID3 = sid.getSteam3RenderedID();
      }
    });

    red.captain.elo = await logs.getCaptainEloFromDB(red.captain.steamID3);
    blue.captain.elo = await logs.getCaptainEloFromDB(blue.captain.steamID3);

    [red.captain.elo_change, blue.captain.elo_change] = 
      elo.calculateElo(red.captain.elo, blue.captain.elo, red.score, blue.score, 32);

    red.captain.new_elo = red.captain.elo + red.captain.elo_change;
    blue.captain.new_elo = blue.captain.elo + blue.captain.elo_change;

    logs.updateCaptainStats(red.captain.steamID3, red.captain.new_elo, red.captain.elo_change);
    logs.updateCaptainStats(blue.captain.steamID3, blue.captain.new_elo, blue.captain.elo_change);

    logs.updateCaptainEloInLog(
      game.log_id, red.captain.steamID3, red.captain.elo, red.captain.elo_change);
    logs.updateCaptainEloInLog(
      game.log_id, blue.captain.steamID3, blue.captain.elo, blue.captain.elo_change);
  }
}


exports.updateDatabaseWithEtf2lPlayerNames = updateDatabaseWithEtf2lPlayerNames;
exports.updateDatabaseWithPugchampPlayerNames = updateDatabaseWithPugchampPlayerNames;
exports.updateDatabaseWithNewGames = updateDatabaseWithNewGames;