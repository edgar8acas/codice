import express from "express";
import textController from "./text.js";
import templateController from "./template.js";
import wordController from "./word.js";
import dictionaryController from "./dictionary.js";
import userOccurrencesController from "./user_occurrence.js";
import usersController from "./users.js";

const router = express.Router();

export default router
  .use("/users", usersController)
  .use("/texts", textController)
  .use("/templates", templateController)
  .use("/words", wordController)
  .use("/dictionary-words", dictionaryController)
  .use("/user-occurrences", userOccurrencesController);
