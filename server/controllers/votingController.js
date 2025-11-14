const votingService = require("../services/votingService");

const buildErrorResponse = (res, error) => {
  const message = error?.message || "Unexpected error";
  const lower = message.toLowerCase();
  const status =
    error?.statusCode ||
    (lower.includes("required") ||
    lower.includes("missing") ||
    lower.includes("invalid")
      ? 400
      : 500);
  return res.status(status).json({ message });
};

exports.addCandidate = async (req, res) => {
  try {
    const { name } = req.body;
    const receipt = await votingService.addCandidate(name);
    res.status(201).json({
      message: "Candidate added",
      transactionHash: receipt?.transactionHash,
    });
  } catch (error) {
    buildErrorResponse(res, error);
  }
};

exports.getCandidates = async (_req, res) => {
  try {
    const candidates = await votingService.getCandidates();
    res.json({ candidates });
  } catch (error) {
    buildErrorResponse(res, error);
  }
};

exports.vote = async (req, res) => {
  try {
    const { account, candidateIndex } = req.body;

    if (typeof candidateIndex === "undefined") {
      return res.status(400).json({ message: "candidateIndex is required" });
    }

    const parsedIndex = Number(candidateIndex);
    if (Number.isNaN(parsedIndex) || parsedIndex < 0) {
      return res.status(400).json({ message: "candidateIndex must be >= 0" });
    }

    if (!account) {
      return res.status(400).json({ message: "account address is required" });
    }

    const receipt = await votingService.vote(parsedIndex, account);

    res.json({
      message: "Vote cast successfully",
      transactionHash: receipt?.transactionHash,
    });
  } catch (error) {
    buildErrorResponse(res, error);
  }
};

exports.getWinner = async (_req, res) => {
  try {
    const winner = await votingService.getWinner();
    res.json({ winner });
  } catch (error) {
    buildErrorResponse(res, error);
  }
};

