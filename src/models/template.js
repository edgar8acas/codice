import Sequelize from 'sequelize';
import Word from '@models';
import Text from '@models';

module.exports = function(sequelize, DataTypes) {
  const Template = sequelize.define(
    'Template',
    {
      tableName: 'template_words',
      freezeTableNames: true,
      underscored: true
    }
  )
  Word.belongsToMany(Text, { through: Template});
  Text.belongsToMany(Word, { through: Template});
  return Template;
}
