const Log = require("../models/log.js");

const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  Log.find().sort({ log_id: -1 })
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
})

module.exports = router;