const pollModel = require("../models/poll.model");

// GET all polls
const getAllPolls = async (req, res) => {
  try {
    const polls = await pollModel.find();
    res.status(200).json(polls);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch polls", error: error.message });
  }
};

// CREATE a new poll
const createPoll = async (req, res) => {
  try {
    const { question, options } = req.body;

    if (!question || typeof question !== "string" || question.trim() === "") {
      return res.status(400).json({ error: "Question is required." });
    }

    if (
      !options ||
      !Array.isArray(options) ||
      options.length < 2 ||
      options.length > 4
    ) {
      return res
        .status(400)
        .json({ error: "Options must be an array with 2 to 4 items." });
    }

    const normalizedOptions = options.map((opt) => ({
      text: typeof opt === "string" ? opt.trim() : opt.text?.trim(),
      votes: 0,
    }));

    const newPoll = await pollModel.create({
      question: question.trim(),
      options: normalizedOptions,
    });

    res.status(201).json(newPoll);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res
      .status(500)
      .json({ message: "Failed to create poll", error: error.message });
  }
};

// VOTE on a poll by id
const voteOnPoll = async (req, res) => {
  try {
    const { id } = req.params;
    const { optionIndex } = req.body;

    if (typeof optionIndex !== "number" || optionIndex < 0) {
      return res.status(400).json({ error: "Valid optionIndex is required." });
    }

    const poll = await pollModel.findById(id);
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }
    if (optionIndex >= poll.options.length) {
      return res.status(400).json({ error: "Invalid option index." });
    }

    poll.options[optionIndex].votes += 1;
    const updatedPoll = await poll.save();
    res.status(200).json(updatedPoll);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to vote on poll", error: error.message });
  }
};

// DELETE a poll by id
const deletePoll = async (req, res) => {
  try {
    const { id } = req.params;

    const poll = await pollModel.findById(id);
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }
    await pollModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Poll deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid poll ID." });
    }
    res
      .status(500)
      .json({ message: "Failed to delete poll", error: error.message });
  }
};

// GET poll results by id
const getPollResults = async (req, res) => {
  try {
    const poll = await pollModel.findById(req.params.id);

    if (!poll) {
      return res.status(404).json({ error: "Poll not found." });
    }

    // Calculate percentages for results endpoint
    const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);

    const results = poll.options.map((option) => ({
      _id: option._id,
      text: option.text,
      votes: option.votes,
      percentage:
        totalVotes === 0 ? 0 : Math.round((option.votes / totalVotes) * 100),
    }));

    res.json({ question: poll.question, results, totalVotes });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid poll ID." });
    }
    res.status(500).json({ error: "Failed to fetch results." });
  }
};

module.exports = {
  getAllPolls,
  createPoll,
  voteOnPoll,
  deletePoll,
  getPollResults,
};
