// require("dotenv").config();
// if (process.env.NODE_ENV !== 'production') { 
//   require('dotenv').config();
// }
require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cron = require('node-cron');

const jobs = require("./src/jobs.js"); 


// atlas db connection
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true  });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to db"));

app.use(express.json());

// cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if(req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET");
    // res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

const playersRouter = require("./routes/players.js");
app.use("/api/players", playersRouter);
const captainsRouter = require("./routes/captains.js");
app.use("/api/captains", captainsRouter);
const logsRouter = require("./routes/logs.js");
app.use("/api/logs", logsRouter);

// route everything to index.html
const history = require('connect-history-api-fallback');
app.use(history());

// serve static site built by vue
app.use(express.static("dist"));

app.listen(process.env.PORT || 3000, () => {
  console.log("server started");

  // cron.schedule("0 * * * *", () => {
  //   console.log("CRON jobs.updateDatabaseWithPugchampPlayerNames()");
  //   jobs.updateDatabaseWithPugchampPlayerNames();
  // });

  cron.schedule("0 * * * *", () => {
    console.log("CRON etf2l.updateDatabaseWithEtf2lPlayerNames()");
    jobs.updateDatabaseWithEtf2lPlayerNames();
  });

  cron.schedule("* * * * *", () => {
    console.log("CRON jobs.updateDatabaseWithNewGames()");
    jobs.updateDatabaseWithNewGames();
  });

  // jobs.updateDatabaseWithEtf2lPlayerNames();
  // jobs.updateDatabaseWithPugchampPlayerNames();
  // jobs.updateDatabaseWithNewGames();
});
