const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  steamID: { type: String },
  steamID3: { type: String },
  steamID64: { type: String },
  etf2l_name: { type: String },
  pug_name: { type: String },

  elo: { type: Number },
  elo_change: { type: Number },
  games_total: { type: Number },
  cap_elo: { type: Number},
  cap_elo_change: { type: Number },
  cap_games_total: { type: Number }
});

module.exports = mongoose.model("Player", playerSchema);