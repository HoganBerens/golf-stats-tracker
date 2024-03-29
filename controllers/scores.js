const holeSchema = require("../models/user");

function newScore(req, res) {
  req.user.lastScore = {
    holes: [],
    totals: [],
  };
  res.render("scores/new", { count: 1, clubs: req.user.clubs, errorMsg: "" });
}

async function create(req, res) {
  req.user.count++;
  await req.user.lastScore.holes.push(req.body);
  await req.user.save();
  res.redirect("/scores/new");
}

function show(req, res) {
  res.render("scores/show", { scores: req.user.scores });
}

function addToUser(req, res) {
  res.render("scores/submit");
}

async function submit(req, res) {
  let user = req.user;
  user.lastScore.totals.push(req.body);
  user.scores.push(user.lastScore);
  user.count = 1;
  await user.save();
  res.redirect("/scores");
}

async function deleteScore(req, res) {
  let user = req.user;
  user.scores.remove(req.params.id);
  await user.save();
  res.redirect("/scores");
}

module.exports = {
  create,
  new: newScore,
  show,
  addToUser,
  submit,
  delete: deleteScore,
};
