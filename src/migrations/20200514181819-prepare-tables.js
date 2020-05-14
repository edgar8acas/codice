'use strict';
import { promises as fs } from 'fs';

const name = 'codice_dev';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const tables = await fs.readFile(__dirname + '/../database/create-tables.sql');
      const texts = await fs.readFile(__dirname + '/../database/insert-texts.sql');
      await queryInterface.sequelize.query(tables.toString());
      await queryInterface.sequelize.query(texts.toString());
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const query = await fs.readFile(__dirname + '/../database/delete-tables.sql');
      await queryInterface.sequelize.query(query.toString());
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
