import Sequelize from 'sequelize';
import { Word, User } from '@models';

module.exports = function (sequelize, DataTypes) {
  const Dictionary = sequelize.define(
    'Dictionary', {
      dictionaryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      isLearned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false
      }
    },
    {
      tableName: 'dictionary_words',
      freezeTableNames: true,
      underscored: true
    }
  )

  Dictionary.belongsTo(Word, { foreignKey: 'wordId'});
  Dictionary.belongsTo(User, { foreignKey: 'userId'});

  return Dictionary;
}
