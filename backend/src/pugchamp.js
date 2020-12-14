const Player = require("../models/player.js");

const puppeteer = require('puppeteer');


// scrape player data from pugchamp
async function scrapePlayerData() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto("https://eu.pug.champ.gg/players", { "waitUntil": "networkidle0" });

  const data = await page.evaluate("document.querySelector('#players').getAttribute('data')");
  const player_data = await JSON.parse(data);

  await browser.close();

  return player_data;
}

async function updateName(steamID64, pug_name) {
  try {
    await Player.update(
      { steamID64: steamID64 },
      { $set: { pug_name: pug_name } }
    );

    // console.log(`pug_name of ${pug_name} has been updated.`);
  }
  catch (error) {
    console.log(error);
  }
}


// scrape game info from pugchamp
async function scrapeListOfGames() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto("https://eu.pug.champ.gg/games", { waitUntil: "networkidle0" });

  const game_list = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".pugchamp-game-summary-0"), element => element.game));

  await browser.close();

  return game_list;
}

async function scrapeLogIDFromGame(game) {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(`https://eu.pug.champ.gg/game/${game._id}`, { waitUntil: "networkidle0" });

    // const href = await page.evaluate("document.querySelector('#details > p:nth-child(6) > a:nth-child(1)').getAttribute('href')");
    // const log_id = await href.split('http://logs.tf/')[1];

    let link_list = await page.evaluate(() =>
      Array.from(document.querySelectorAll("#details > p:nth-child(6) > a"), element => element.href));

    link_list = link_list.filter(link => {
      return link.includes("http://logs.tf/")
    })

    const log_id = await link_list[0].split('http://logs.tf/')[1];

    await browser.close();

    return log_id;
  }
  catch (error) {
    console.log(error);
  }
}

exports.scrapePlayerData = scrapePlayerData;
exports.updateName = updateName;
exports.scrapeListOfGames = scrapeListOfGames;
exports.scrapeLogIDFromGame = scrapeLogIDFromGame;