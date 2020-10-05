module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    'User', {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'users',
      freezeTableNames: true,
      underscored: true
    }
  )

  return User;
}
