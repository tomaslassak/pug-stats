const Player = require("../models/player.js");

const fetch = require("node-fetch");

// waits before every new fetch request so it doesnt get 429'd
const timer = ms => new Promise(r => setTimeout(r, ms));

function updateAllNames() {
  Player.find().then(docs => {
    updateNameWithDelay(docs);
  });
}

async function updateNameWithDelay(docs) {
  for await(let player of docs) {
    await timer(100);
    updateName(player.steamID64);
  }
}

async function updateName(steamID64) {
  const result = await fetch(`https://api.etf2l.org/player/${steamID64}.json`);
  const etf2l_player = await result.json();

  try {
    await Player.update(
      { steamID64: steamID64 },
      { $set: { etf2l_name: etf2l_player.player.name } }
    );

    // console.log(`etf2l_name of ${etf2l_player.player.name} has been updated.`);
  }
  catch (error) {
    console.log(error);
  }
}

exports.updateAllNames = updateAllNames;