import { getQuestionSuggestions } from "../services/search.service.js";

export const fetchSuggestions = (req, res) => {
  const { q, type } = req.query;

  let suggestions = [];
  if (type === "questions") {
    suggestions = getQuestionSuggestions(q);
  }

  res.json(suggestions);
};
