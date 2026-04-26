const express = require("express");
const router = express.Router();
const {
  getAllPolls,
  createPoll,
  voteOnPoll,
  deletePoll,
  getPollResults,
} = require("../controllers/pollController");

/**
 * @route   GET    /polls
 * @desc    Get all polls
 * @access  Public
 *
 */
router.get("/", getAllPolls);

/**
 * @route   POST   /polls
 * @desc    Create a new poll
 * @access  Public
 */
router.post("/", createPoll);

/**
 * @route   POST   /polls/:id/vote
 * @desc    Vote on a poll by id
 * @access  Public
 */
router.post("/:id/vote", voteOnPoll);

/**
 * @route   DELETE /polls/:id
 * @desc    Delete a poll by id
 * @access  Public
 */
router.delete("/:id", deletePoll);

/**
 * @route   GET    /polls/:id/results
 * @desc    Get poll results by id
 * @access  Public
 */
router.get("/:id/results", getPollResults);

module.exports = router;
