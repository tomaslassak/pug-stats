const Player = require("../models/player.js");

function averageTeamElo(player_list) {
  let avg = 0;

  player_list.forEach(player => {
    avg += player.elo;
  })

  avg = avg / player_list.length;
  return avg;
}

function getChanceOfWinning(side1_elo, side2_elo) {
  return 1 / (1 + Math.pow(10, (side1_elo - side2_elo) / 400));
}

function calculateElo(side1_elo, side2_elo, side1_score, side2_score, KFactor) {
  side1_chance_of_winning = getChanceOfWinning(side2_elo, side1_elo);
  side2_chance_of_winning = getChanceOfWinning(side1_elo, side2_elo);

  let side1_elo_change = null;
  let side2_elo_change = null;

  if (side1_score > side2_score) {
    side1_elo_change = KFactor * (1 - side1_chance_of_winning);
    side2_elo_change = KFactor * (0 - side2_chance_of_winning);
  }
  else if (side1_score < side2_score) {
    side1_elo_change = KFactor * (0 - side1_chance_of_winning);
    side2_elo_change = KFactor * (1 - side2_chance_of_winning);
  }
  else {
    side1_elo_change = KFactor * (0.5 - side1_chance_of_winning);
    side2_elo_change = KFactor * (0.5 - side2_chance_of_winning);
  }

  return [side1_elo_change, side2_elo_change];
}

exports.averageTeamElo = averageTeamElo;
exports.calculateElo = calculateElo;