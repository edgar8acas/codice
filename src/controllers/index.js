import express from 'express';
import textController from './text.js';
import templateController from './template.js';
import wordController from './word.js';

const app = express();

export default app
  .use('/texts', textController)
  .use('/templates', templateController)
  .use('/words', wordController);