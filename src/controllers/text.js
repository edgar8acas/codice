import express from 'express';
import multer from 'multer';
import { Text } from '@models';

const router = express.Router();
const upload = multer();

export default router
  .get('/', async (req, res) => {
    try {
      const items = await Text.findAll();

      return res
        .status(200)
        .json(items)

    } catch(error) {

      return res
        .status(500)
        .json({ error })
    }
  })
  .get('/:id', async (req, res) => {
    const { 
      params: { id: textId }
    } = req
    try {
      const item = await Text.findByPk(textId);
      
      return res
        .status(200)
        .json(item)
    
      } catch(error) {
      
      return res
        .status(500)
        .json({ error })
    }
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
      .json(item);
  })
  .put('/:id', (req, res) => {

  })
  .delete('/:id', (req, res) => {

  })
  .post('/:id/content', upload.single('rawContent'),  async (req, res) => {
    const { 
      file, 
      body: { textId } 
    } = req;

    try {
      let item = await Text.findByPk(textId);
      item = await item.update({
        rawContent: file.buffer.toString('utf-8')
      });

      return res
        .status(200)
        .json(item)
    } catch (error) {
      
      return res
        .status(500)
        .json({ error })
    }
  })