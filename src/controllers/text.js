import express from 'express';

const router = express.Router();

export default router
  .get('/', (req, res) => {
    
  })
  .get('/:id', (req, res) => {

  })
  .post('/', (req, res) => {
    const { body } = req;
    
    return res.json(body).status(200);
  })
  .put('/:id', (req, res) => {

  })
  .delete('/:id', (req, res) => {

  })