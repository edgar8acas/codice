import express from 'express';
import { Text } from '@models';

const router = express.Router();

export default router
  .get('/', (req, res) => {
    
  })
  .get('/:id', (req, res) => {

  })
  .post('/', async (req, res) => {
    const { body } = req;
    let item;
    try {
      //TODO: Filter fields
      item = await Text.create(body);
      item = await item.save();
    } catch(e) {
      return res
        .status(500)
        .json({ msg: e })
    }

    return res
      .status(201)
      .json({ data: item });
  })
  .put('/:id', (req, res) => {

  })
  .delete('/:id', (req, res) => {

  })