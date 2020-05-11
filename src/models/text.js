import Sequelize from 'sequelize';
const Op = Sequelize.Op;

module.exports = function(sequelize, DataTypes) {
  const Text = sequelize.define(
    'Text',
    {
      textId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      grade: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('PROCESSED', 'UNPROCESSED'),
        allowNull: true
      },
      rawContent: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      tableName: 'texts',
      freezeTableNames: true,
      underscored: true
    }
  )

  Text.getTextsToProcess = async textId => {
    try {
      const { grade, category } = await Text.findOne({
        where: {
          textId: textId
        }
      });
      const texts = await Text.findAll({
        where: {
          grade,
          category,
          rawContent: {
            [Op.not]: null
          }
        }
      })
      return texts;
    } catch (err) {
      return err;
    }

  }
  return Text
}
