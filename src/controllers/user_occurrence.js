import express from 'express';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;
import { UserOccurrence, Word, Dictionary } from '@models';
const router = express.Router();

export default router
  .post('/', async (req, res) => {
    const {
      body: {
        occurrences
      }
    } = req

    try {
      // TODO: Will fail for different users
      const existent = await UserOccurrence.findOne({
        where: {
          [Op.and]: [{ 
            positionInText: { [Op.in]: occurrences.map(o => o.position) }
          },
          {
            textId: occurrences[0].textId
          }]
        }
      });

      if (existent) {
        return res
          .status(500)
          .json({ error: 'Error al crear ocurrencia: es posible que ya exista.'})
      }
      //TODO: validate occurrence
      const userOccurrences = await UserOccurrence.bulkCreate(
        occurrences.map(o => {
          return {
            textId: o.textId,
            start: o.start,
            ending: o.ending,
            word: o.token.toLowerCase(),
            positionInText: o.position,
            essential: false,
            visible: true,
            userId: 1
          }
        })
      )

      return res
      .status(201)
      .json({
        userOccurrences
      });
    } catch(e) {
      console.log(e);
      return res
        .status(500)
        .json({ error: e.message })
    }
  })
  .put('/:id/update-selected', async (req, res) => {
    const {
      params: { id: userOccurrenceId },
      body
    } = req;

    try {
      const result = await UserOccurrence.update({
        selectedWordId: body.selectedWordId,
        visible: body.visible
      }, { 
        where: { userOccurrenceId },
        returning: true
      })

      const updated = await UserOccurrence.findOne({
        where: { userOccurrenceId: result[1][0].userOccurrenceId },
        include: [{ model: Word }]
      });

      const matchingWords = await Word.findAll({
        where: { word: updated.word }
      });
      
      let dictionaryWord = await Dictionary.findOne({
        where: { 
          wordId: result[1][0].selectedWordId,
          userId: result[1][0].userId 
        },
        include: [{ model: Word }]
      });

      if (!dictionaryWord) {
        //TODO: Validate
        await Dictionary.create({
          wordId: result[1][0].selectedWordId,
          userId: result[1][0].userId,
          isLearned: false
        });
        dictionaryWord = await Dictionary.findOne({
          where: { 
            wordId: result[1][0].selectedWordId,
            userId: result[1][0].userId 
          },
          include: [{ model: Word }]
        });
      }

      return res
        .status(200)
        .json({
          updated,
          matchingWords,
          dictionaryWord
        });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: 'Error al actualizar la ocurrencia.'});
    }
  })
  .delete('/:id', async (req, res) => {
    const {
      params: { id }
    } = req
    try {
      const occurrence = await UserOccurrence.findByPk(id);
      const count = await occurrence.destroy();
      return res
        .status(200)
        .json({ message: 'Ocurrencia eliminada', count});
    } catch(e) {
      console.log(e.message);
      return res
        .status(500)
        .json({ error: 'Error al eliminar ocurrencia' })
    }
  })