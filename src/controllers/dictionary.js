import express from 'express';
import { Dictionary } from '@models';

const router = express.Router();

export default router
  .put('/', async (req, res) => {

    const { body } = req;
    let item;
    try {
      //TODO: Filter fields
      item = await Dictionary.findByPk(body.dictionaryId);
      
      if(item === null)
        return res
          .status(404)
          .json({ msg: 'Palabra de diccionario no encontrada'})
      
      item = await item.update({
        isLearned: body.isLearned
      });

    return res
    .status(201)
    .json(item)
    } catch(e) {
      return res
        .status(500)
        .json({ msg: e })
    }
  })