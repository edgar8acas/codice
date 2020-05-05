import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import api from './src/controllers/index';

const app = express();

if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  app.use(cors());
} 
export default app
  .use(morgan('tiny'))
  .use(bodyParser.json())
  .use('/api', api)