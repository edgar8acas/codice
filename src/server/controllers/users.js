import express from "express";
import { User } from "@/models";
import UniqueConstraintError from "sequelize/lib/errors/validation/unique-constraint-error";
import ValidationError from "sequelize/lib/errors/validation-error";
import { paginate } from "@/utils/pagination";
import { authenticate } from "@/middleware/auth";
const router = express.Router();

export default router
  .post("/", async (req, res) => {
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
  })
  .get("/", [authenticate, paginate(User)], async (req, res) => {
    return res.status(200).json(res.paginatedResults);
  })
  .put("/:id", async (req, res) => {
    //Currently only admin users are able to update other users.
    const {
      params: { id: userId },
    } = req;

    try {
      await User.update(req.body, {
        where: {
          userId: Number(userId),
        },
      });
      return res.status(200).json({ msg: "Usuario actualizado" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Error al actualizar el elemento" });
    }
  });
