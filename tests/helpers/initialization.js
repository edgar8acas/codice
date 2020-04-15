import { Text } from '@models';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

export async function insertTexts() {
  const texts = require('./../fixtures/texts.json').slice(0,3);
  return await Text.bulkCreate(texts);
}

export async function deleteTexts() {
  await Text.destroy({
    where: {
      title: {
        [Op.like]: 'Test%'
      }
    }
  })
}
