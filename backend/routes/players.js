const Player = require("../models/player.js");

const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const docs = await Player.find().sort({ elo: -1 });
    docs.filter(doc => doc.elo);
    res.status(200).json(docs);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({
      error: err
    });
  }
})

module.exports = router;