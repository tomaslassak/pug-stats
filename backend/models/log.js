const mongoose = require("mongoose");

const logSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  log_id: { type: Number, required: true, unique: true },
  data: { type: Object, required: true }
});

module.exports = mongoose.model("Log", logSchema);