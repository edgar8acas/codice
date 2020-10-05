import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

export default function initializeServer(router) {
  const app = express();

  app.use(morgan('tiny'));
  app.use(bodyParser.json());
  app.use('/api', router);
  
  if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    app.use(cors());
  }

   return app;
}