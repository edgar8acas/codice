import { Text, Word } from '@models';
import Sequelize from 'sequelize';
import { promises as fs} from 'fs';
const Op = Sequelize.Op;

export async function insertTexts(begin, end) {
  let texts;
  if (end) {
    texts = require('./../fixtures/texts.json').slice(begin,end);
  } else {
    texts = require('./../fixtures/texts.json').slice(begin);
  }
  return await Text.bulkCreate(texts);
}

export async function deleteTexts(title = 'Test%') {
  await Text.destroy({
    where: {
      title: {
        [Op.like]: title
      }
    }
  })
}

export async function insertRawContent(file, text) {
  return fs.readFile(`${__dirname}/../data/${file}`)
    .then(buffer => {
      return Text.findByPk(text.textId) //In this case, return ensures rejections are handled in the catch
        .then(item => {
          return item.update({
            rawContent: buffer.toString()
          })
        })
    })
    .catch(err => {
      return err;
    })
}

export async function insertWords(fixture) {
  const words = require('./../fixtures/words.json')[fixture];
  return Word.bulkCreate(words);
}

export async function deleteWords(definition = 'Test%') {
  await Text.destroy({
    where: {
      definition: {
        [Op.like]: definition
      }
    }
  })
}

//Will push words already in the database to the expected result
export async function injectWords(expected, saved) {
  const expectedWords = expected.conflicts.map(conflict => conflict.word);
  const savedWords = saved.map(s => s.word);
  const intersection = expectedWords.filter(e => savedWords.includes(e));

  intersection.forEach(word => {
    expected.conflicts.push(saved.filter(s => s[word]));
  });
}
