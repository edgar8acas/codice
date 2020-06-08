import express from 'express';
import { Word } from '@models';

const router = express.Router();

export default router
  .post('/', async (req, res) => {

    const { body } = req;
    let item;
    try {
      //TODO: Filter fields
      item = await Word.create(body);
      item = await item.save();
    } catch(e) {
      return res
        .status(500)
        .json({ msg: e })
    }
    
    return res
      .status(201)
      .json(item)
      
  })