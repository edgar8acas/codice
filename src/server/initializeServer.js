import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

export default function initializeServer(router) {
  const app = express();
  const isProduction = process.env.NODE_ENV === 'production';
  const origin = { origin: isProduction ? false : '*' };
  
  app.use(morgan('tiny'));
  app.use(bodyParser.json());
  app.use(cors(origin));
  app.use('/api', router);
  
  return app;
}