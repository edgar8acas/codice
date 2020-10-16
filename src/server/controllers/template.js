import express from "express";
import {
  Text,
  Word,
  TemplateOccurrence,
  UserOccurrence,
  Dictionary,
} from "@/models";
import { extractWordFromOccurrence } from "@/utils/helpers";
import Sequelize from "sequelize";

const Op = Sequelize.Op;
const router = express.Router();

export default router.get("/", async (req, res) => {
  const {
    query: { text: textId, user: userId },
  } = req;
  try {
    const text = await Text.findByPk(textId);

    if (text === null)
      return res.status(404).json({ msg: "Texto no encontrado" });

    const query = {
      where: { textId, userId },
      include: [{ model: Word }],
    };

    const occurrences = await TemplateOccurrence.findAll({
      where: { textId },
    });

    const response = { text };
    if (userId === undefined) {
      response.templateOccurrences = occurrences;

      response.availableWords = await Word.getAvailableWords(
        Array.from(new Set(occurrences.map(extractWordFromOccurrence)))
      );
      response.dictionaryWords = [];
    } else {
      let userOccurrences = await UserOccurrence.findAll(query);

      if (userOccurrences.length === 0) {
        userOccurrences = await UserOccurrence.bulkCreate(
          occurrences.map((o) => {
            return {
              textId: o.textId,
              userId: userId,
              start: o.start,
              ending: o.ending,
              word: o.word,
              positionInText: o.positionInText,
              essential: true,
              visible: true,
              availableMeanings: false,
            };
          })
        );
      }
      const words = Array.from(
        new Set(userOccurrences.map((o) => o.dataValues.word))
      );

      response.availableWords = await Word.getAvailableWords(
        Array.from(new Set(userOccurrences.map(extractWordFromOccurrence)))
      );

      const foundOrCreated = await Promise.all(
        words.map((word) => {
          return Dictionary.findOrCreate({
            where: {
              [Op.and]: [{ word }, { userId }],
            },
            defaults: {
              word,
              userId,
              isLearned: false,
            },
          });
        })
      );

      response.userOccurrences = userOccurrences;
      response.dictionaryWords = foundOrCreated.map((result) => result[0]);
    }

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json();
  }
});
