import express from 'express';
import textController from './text.js';

const app = express();

export default 
  app.use('/texts', textController);