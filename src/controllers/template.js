import express from 'express';
import { Text, Word, Template } from '@models';

const router = express.Router();

export default router
  .get('/', async (req, res) => {
    const {
      query: { id: textId }
    } = req;
    try {
      const text = await Text.findByPk(textId);

      if (text === null)
        return res
          .status(404)
          .json({ msg: 'Texto no encontrado' });

      const query = {
        where: { textId },
        include: [{ model: Word }]
      }
      const words = await Template.findAll(query).map(found => found.Word);

      let response = {
        text,
        words
      };

      return res
        .status(200)
        .json(response);
    } catch (error) {
      return res
        .status(500)
        .json(error);
    }
  })