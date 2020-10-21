import { Text, Word, sequelize } from "@/models";
import Sequelize from "sequelize";
import { promises as fs } from "fs";
const Op = Sequelize.Op;

export async function insertTexts(texts) {
  return Text.bulkCreate(texts);
}

export async function insertTextsWithContent(texts) {
  const files = ["bancos.txt", "cine.txt", "colegios.txt"];
  const saved = await insertTexts(texts);
  return await Promise.all(
    saved.map((text, index) => insertRawContent(files[index], text))
  );
}

export async function deleteTexts(title = "Test%") {
  await Text.destroy({
    where: {
      title: {
        [Op.like]: title,
      },
    },
  });
}

export async function cleanupDatabase() {
  await sequelize.query(
    `TRUNCATE TABLE texts, words, dictionary_words, template_words, users RESTART IDENTITY;`
  );
}

export async function insertRawContent(file, text) {
  return fs
    .readFile(`${__dirname}/../data/${file}`)
    .then((buffer) => {
      return Text.findByPk(text.textId) //In this case, return ensures rejections are handled in the catch
        .then((item) => {
          return item.update({
            rawContent: buffer.toString(),
          });
        });
    })
    .catch((err) => {
      return err;
    });
}

export async function insertWords(fixture) {
  const words = require("./../fixtures/words.json")[fixture];
  return Word.bulkCreate(words);
}

export async function deleteWords(definition = "Test%") {
  await Word.destroy({
    where: {
      definition: {
        [Op.like]: definition,
      },
    },
  });
}
