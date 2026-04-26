import api from "./axiosInstance";

// GET all polls
export const getPolls = async () => {
  const res = await api.get("/polls");
  return res.data;
};

// CREATE a new poll - simplified, no creator token
export const createPoll = async ({ question, options }) => {
  const res = await api.post("/polls", {
    question,
    options, // plain strings ["Option 1", "Option 2"]
  });

  return res.data;
};

// VOTE on a poll
export const votePoll = async (id, optionIndex) => {
  // Check if user already voted
  if (localStorage.getItem(`voted_${id}`)) {
    throw new Error("You already voted on this poll");
  }

  const res = await api.post(`/polls/${id}/vote`, { optionIndex });

  // Save that this user voted on this poll
  localStorage.setItem(`voted_${id}`, String(optionIndex));

  return res.data;
};

// GET poll results
export const getResults = async (id) => {
  const res = await api.get(`/polls/${id}/results`);
  return res.data;
};

// DELETE a poll - no authentication needed
export const deletePoll = async (id) => {
  const res = await api.delete(`/polls/${id}`);

  // cleanup localStorage after delete
  localStorage.removeItem(`voted_${id}`);

  return res.data;
};
