import express from 'express';
import textController from './text.js';
import templateController from './template.js';

const app = express();

export default 
  app.use('/texts', textController);
  app.use('/templates', templateController);