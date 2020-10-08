"use strict";
import { promises as fs } from "fs";

module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const tables = await fs.readFile(
        __dirname + "/../database/create-tables.sql"
      );
      const triggers = await fs.readFile(
        __dirname + "/../database/create-triggers.sql"
      );
      const texts = await fs.readFile(
        __dirname + "/../database/insert-texts.sql"
      );
      const users = await fs.readFile(
        __dirname + "/../database/insert-users.sql"
      );
      const words = await fs.readFile(
        __dirname + "/../database/insert-words.sql"
      );
      await queryInterface.sequelize.query(tables.toString());
      await queryInterface.sequelize.query(triggers.toString());
      await queryInterface.sequelize.query(texts.toString());
      await queryInterface.sequelize.query(users.toString());
      await queryInterface.sequelize.query(words.toString());
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const tables = await fs.readFile(
        __dirname + "/../database/delete-tables.sql"
      );
      const triggers = await fs.readFile(
        __dirname + "/../database/delete-triggers.sql"
      );
      await queryInterface.sequelize.query(tables.toString());
      await queryInterface.sequelize.query(triggers.toString());
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
