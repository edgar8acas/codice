import path from 'path';

module.exports = {
  development: {
    database: process.env.DEV_DB_DATABASE || 'codice_dev',
    username: process.env.DEV_DB_USERNAME || 'codice1',
    password: process.env.DEV_DB_PASSWORD || 'codice1',
    host: process.env.DEV_DB_HOST || 'localhost',
    dialect: 'postgres',
    migrationStorage: 'json',
    migrationStoragePath: path.resolve(__dirname, '..', 'migrations', 'sequelize-meta.json')
  },
  test: {
    database: process.env.DEV_DB_DATABASE || 'codice_test',
    username: process.env.DEV_DB_USERNAME || 'codice1',
    password: process.env.DEV_DB_PASSWORD || 'codice1',
    host: process.env.DEV_DB_HOST || 'localhost',
    dialect: 'postgres',
    migrationStorage: 'json',
    migrationStoragePath: path.resolve(__dirname, '..', 'migrations', 'sequelize-meta-test.json')
  },
  production: {
    database: process.env.PROD_DB_DATABASE,
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    host: process.env.PROD_DB_HOST,
    dialect: 'postgres'
  }
}