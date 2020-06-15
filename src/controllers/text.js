import express from 'express';
import multer from 'multer';
import { Text, Word, Template, sequelize } from '@models';
import { processTexts } from '@processing';
import { paginate } from '@utils';

const router = express.Router();
const upload = multer();

export default router
  .get('/', paginate(Text), async (req, res) => {
    return res
      .status(200)
      .json(res.paginatedResults)
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
  .post('/:id/process', async (req, res) => {
    const {
      params: { id: textId }
    } = req

    try {
      const text = await Text.findByPk(textId);
      if(text === null)
        return res
          .status(404)
          .json({ msg: 'Texto no encontrado'})
      
      if(text.status === 'processed' || !text.rawContent) {
        return res
          .status(500)
          .json({ msg: 'Este texto ya fue procesado o el contenido no ha sido proporcionado'});
      }

      const texts = await Text.getTextsToProcess(text.textId);
      const processed = await processTexts(texts);
      const conflicts = await Word.compareBeforeSaving(
        processed.find(processed => processed.textId === Number(textId)).essentialWords
      );
      return res
        .status(200)
        .json({text, ...conflicts});
    } catch (error) {
      return res
        .status(500)
        .json(error)
    }
  })
  .post('/:id/process/save', async (req, res) => {
    const {
      body: {
        occurrences
      },
      params: { id: textId }
    } = req

    const item = await Text.findByPk(textId);
    
    if(item === null)
      return res
        .status(404)
        .json({ msg: 'Texto no encontrado'})

    if(item.status === 'processed' || !item.rawContent) {
      return res
        .status(500)
        .json({ msg: 'Este texto ya fue procesado o el contenido no ha sido proporcionado'});
    }

    //TODO: Validate occurrences

      const transaction = await sequelize.transaction();
    try {
      const toSaveInTemplate = occurrences.map(
        o => {
          return { 
            wordId: o.selectedWordId, 
            textId: o.textId,
            start: o.start,
            ending: o.ending 
          }
        })
      const savedInTemplate = await Template.bulkCreate(toSaveInTemplate);

      let text = await Text.findByPk(textId);
      text = await text.update({
        status: 'processed'
      });
      await transaction.commit();
      return res
        .status(200)
        .json(savedInTemplate);
    } catch (error) {
      await transaction.rollback();
      return res
        .status(500)
        .json(error)
    }
  })