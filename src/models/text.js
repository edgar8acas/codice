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
  return Text
}
