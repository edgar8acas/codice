import Sequelize from 'sequelize';
import { Word, Text, User } from '@models';

module.exports = function (sequelize, DataTypes) {
  const UserOccurrence = sequelize.define(
    'UserOccurrence', {
      userOccurrenceId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      start: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ending: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: 'user_occurrences',
      freezeTableNames: true,
      underscored: true
    }
  )

  UserOccurrence.belongsTo(Word, { foreignKey: 'wordId'});
  UserOccurrence.belongsTo(Text, { foreignKey: 'textId'});
  UserOccurrence.belongsTo(User, { foreignKey: 'userId'});

  return UserOccurrence;
}
