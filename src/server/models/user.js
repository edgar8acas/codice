import { hashPasswordHook } from "../utils/helpers";
import { DataTypes } from "sequelize";

module.exports = function (sequelize) {
  const User = sequelize.define(
    "User",
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [6, 20],
            msg: "El nombre de usuario debe tener entre 6 y 20 caracteres.",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^.{8,}/i,
            msg: "La contraseña debe tener mínimo 8 caracteres.",
          },
        },
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "users",
      freezeTableNames: true,
      underscored: true,
    }
  );

  User.addHook("beforeCreate", hashPasswordHook);
  User.addHook("beforeUpdate", hashPasswordHook);

  return User;
};
