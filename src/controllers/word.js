import express from 'express';
import { Word } from '@models';
import { paginate } from '@utils';
const router = express.Router();

export default router
  .get('/', paginate(Word), async (req, res) => {
    return res
      .status(200)
      .json(res.paginatedResults)
  })
  .post('/', async (req, res) => {

    const { body } = req;
    let item;
    try {
      //TODO: Filter fields
      item = await Word.create(body);
      
    } catch(e) {
      console.log(e)
      return res
        .status(500)
        .json({ msg: e })
    }
    
    return res
      .status(201)
      .json(item)
      
  })
  .delete('/:id', async(req, res) => {
    const { id } = req.params;

    try {
      const wordId = Number(id);
      const deleted = await Word.destroy({
        where: {
          wordId
        }
      })

      return res
        .status(200)
        .json({ count: deleted})
    } catch (e) {
      console.error(e);
      return res
        .status(500)
        .json({ msg: 'Error al eliminar el elemento'})
    }
  })