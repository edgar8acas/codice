import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import api from './src/controllers/index';

const app = express();

export default app
  .use(morgan('tiny'))
  .use(bodyParser.json())
  .use('/api', api)