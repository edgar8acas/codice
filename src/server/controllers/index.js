import express from "express";
import textController from "./text.js";
import templateController from "./template.js";
import wordController from "./word.js";
import dictionaryController from "./dictionary.js";
import userOccurrencesController from "./user_occurrence.js";
import usersController from "./users.js";
import authController from "./auth.js";
import { authenticate } from "@/middleware/auth.js";

const router = express.Router();

export default router
  .use("/auth", authController)
  .use("/users", usersController)
  .use(authenticate)
  .use("/texts", textController)
  .use("/templates", templateController)
  .use("/words", wordController)
  .use("/dictionary-words", dictionaryController)
  .use("/user-occurrences", userOccurrencesController);
