const express = require("express");
const {
  addCandidate,
  getCandidates,
  vote,
  getWinner,
} = require("../controllers/votingController");

const router = express.Router();

router.post("/candidates", addCandidate);
router.get("/candidates", getCandidates);
router.post("/vote", vote);
router.get("/winner", getWinner);

module.exports = router;

