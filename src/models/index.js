import { Sequelize } from 'sequelize';
import config from './../config/database';
const env = process.env.NODE_ENV || 'development';

const { database, username, password, host, dialect } = config[env];

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect
});

const Text = sequelize.import('./text.js');
const Word = sequelize.import('./word.js');
const Template = sequelize.import('./template.js');

sequelize.authenticate()
  .then(() => {
    console.log('Database connected!');
  })
  .catch(error => {
    console.error('Unable to connect to database: ', error);
  })

export {
  sequelize,
  Sequelize,
  Text,
  Word,
  Template
};