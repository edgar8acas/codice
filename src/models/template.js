import Sequelize from 'sequelize';
import { Word, Text } from '@models';

module.exports = function (sequelize, DataTypes) {
  const Template = sequelize.define(
    'Template', {},
    {
      tableName: 'template_words',
      freezeTableNames: true,
      underscored: true
    }
  )

  Word.belongsToMany(Text,
    {
      through: Template, foreignKey: {
        type: DataTypes.INTEGER,
        name: 'wordId',
        allowNull: false
      }
    });

  Text.belongsToMany(Word, {
    through: Template, foreignKey: {
      type: DataTypes.INTEGER,
      name: 'textId',
      allowNull: false
    }
  });
  
  return Template;
}
