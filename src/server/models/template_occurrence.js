import { Text } from "@models";

module.exports = function (sequelize, DataTypes) {
  const TemplateOccurrence = sequelize.define(
    "TemplateOccurrence",
    {
      templateId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      start: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ending: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      word: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      positionInText: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "template_occurrences",
      freezeTableNames: true,
      underscored: true,
    }
  );

  /*Text.belongsToMany(Word, {
    through: TemplateOccurrence, foreignKey: {
      type: DataTypes.INTEGER,
      name: 'textId',
      allowNull: false
    }
  });*/
  TemplateOccurrence.belongsTo(Text, { foreignKey: "textId" });
  //TemplateOccurrence.belongsTo(Word, { foreignKey: 'wordId'});
  return TemplateOccurrence;
};
