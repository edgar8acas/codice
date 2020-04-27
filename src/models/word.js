import Sequelize from 'sequelize';
const Op = Sequelize.Op;

module.exports = function(sequelize, DataTypes) {
  const Word = sequelize.define(
    'Word',
    {
      wordId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      word: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      definition: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      videoUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      tableName: 'words',
      freezeTableNames: true,
      underscored: true
    }
  )
  return Word; 
}
