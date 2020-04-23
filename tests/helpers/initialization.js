import { Text } from '@models';
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
