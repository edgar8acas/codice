import express from 'express';
import { UserOccurrence, Word, User } from '@models';
const router = express.Router();

export default router
  .post('/', async (req, res) => {
    const {
      body
    } = req

    try {
      const existent = await UserOccurrence.findOne({
        where: {
          start: body.start,
          textId: body.textId
        }
      });
  
      if (existent) {
        return res
          .status(500)
          .json({ error: 'Error al crear ocurrencia: es posible que ya exista.'})
      }
      //TODO: validate occurrence
      const item = await UserOccurrence.create(
        {
          ...body,
          essential: false,
          visible: true,
          userId: 1
        }
      );

      return res
      .status(201)
      .json(item);
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
        selectedWordId: body.selectedWordId
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

      return res
        .status(200)
        .json({
          updated,
          matchingWords,
          dictionaryWord: {}
        });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: 'Error al actualizar la ocurrencia.'});
    }
  })