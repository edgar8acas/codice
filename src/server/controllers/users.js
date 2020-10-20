import express from "express";
import { User } from "@/models";
import UniqueConstraintError from "sequelize/lib/errors/validation/unique-constraint-error";
import ValidationError from "sequelize/lib/errors/validation-error";
const router = express.Router();

export default router.post("/", async (req, res) => {
  const { body } = req;

  try {
    await User.create(body);
    return res.status(200).json({ msg: "Usuario creado." });
  } catch (e) {
    console.log(e);
    const type = Object.getPrototypeOf(e);
    if (type === UniqueConstraintError.prototype) {
      return res.status(400).json({
        error: "El nombre de usuario ya existe",
      });
    } else if (type === ValidationError.prototype) {
      return res.status(400).json({
        error: "La contraseña o el nombre de usuario son inválidos",
      });
    }
    return res.status(500).json({});
  }
});
