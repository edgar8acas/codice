import express from 'express';
import { Text, Word, TemplateOccurrence, UserOccurrence, Dictionary } from '@models';
import Sequelize from 'sequelize';

const Op = Sequelize.Op;
const router = express.Router();

export default router
  .get('/', async (req, res) => {
    const {
      query: { 
        text: textId,
        user: userId
      }
    } = req;
    try {
      const text = await Text.findByPk(textId);

      if (text === null)
        return res
          .status(404)
          .json({ msg: 'Texto no encontrado' });

      const query = {
        where: { textId, userId },
        include: [{ model: Word }]
      }
      let userOccurrences = await UserOccurrence.findAll(query);
      
      if( userOccurrences.length === 0 ) {
        const occurrences = await TemplateOccurrence.findAll({
          where: { textId },
        });
        userOccurrences = await UserOccurrence.bulkCreate(
          occurrences.map(o => {
            return {
              textId: o.textId,
              userId: userId,
              start: o.start,
              ending: o.ending,
              word: o.word,
              essential: true,
              visible: true,
              availableMeanings: false
            }
          })
        )
      }
      //const wordIds = Array.from( new Set( userOccurrences.map(o => o.wordId )) );

      /*let dictionaryWords = await Dictionary.findAll({
        where: {
          [Op.and]: [
            { wordId: {[Op.in]: wordIds}},
            { userId: userId }
          ]          
        },
        include: [{ model: Word }]
      })

      if( dictionaryWords.length === 0 ) {
        dictionaryWords = await Dictionary.bulkCreate(
          wordIds.map(id => {
            return {
              userId: userId,
              wordId: id,
            }
          })
        )
      }*/

      let response = {
        text,
        userOccurrences,
        dictionaryWords: []
      };

      return res
        .status(200)
        .json(response);
    } catch (error) {
      return res
        .status(500)
        .json();
    }
  })