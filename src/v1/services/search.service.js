import Fuse from "fuse.js";
import fs from "fs";
import path from "path";

const questionsPath = path.resolve("./src/v1/data/searchResults.json");
const questionsData = fs.readFileSync(questionsPath);
const questions = JSON.parse(questionsData);

const questionFuse = new Fuse(questions, {
  keys: ["question", "answer"],
  threshold: 0.3,
});

export const getQuestionSuggestions = (searchTerm) => {
  if (!searchTerm) return [];
  return questionFuse.search(searchTerm).map((result) => result.item);
};
