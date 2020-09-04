import express from 'express';
import { Text, Word, TemplateOccurrence, UserOccurrence, Dictionary } from '@models';
import { extractWordFromOccurrence } from '@utils/helpers';
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
      
      const occurrences = await TemplateOccurrence.findAll({
        where: { textId }
      });
      
      const response = { text };
      if (userId === undefined) {
        response.templateOccurrences = occurrences;

        response.availableWords = await Word.getAvailableWords(
          Array.from(
            new Set( occurrences.map(extractWordFromOccurrence) )
          )
        );
        response.dictionaryWords = [];
      } else {
        let userOccurrences = await UserOccurrence.findAll(query);
      
        if( userOccurrences.length === 0 ) {
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
        const wordIds = Array.from( 
          new Set( userOccurrences.map(o => o.dataValues.selectedWordId ))
        );
        const dictionaryWords = await Dictionary.findAll({
          where: {
            [Op.and]: [
              { wordId: {[Op.in]: wordIds}},
              { userId: userId }
            ]          
          },
          include: [{ model: Word }]
        })

        response.userOccurrences = userOccurrences;
        response.dictionaryWords = dictionaryWords;
        response.availableWords = await Word.getAvailableWords(Array.from(
          new Set( occurrences.map(extractWordFromOccurrence) )
        ));
      }
      
      return res
        .status(200)
        .json(response);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json();
    }
  })