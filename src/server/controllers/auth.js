import express from "express";
import { User } from "@/models";
import { checkPassword } from "../utils/helpers";
import { generateToken, verifyToken } from "../utils/jwt";

const router = express.Router();
const cookieOptions = {
  httpOnly: true,
};

export default router
  .post("/", async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ where: { username } });

      if (!user) throw Error("User does not exist.");

      const match = await checkPassword(user.password, password);

      if (match) {
        //Issue token
        const token = await generateToken(user);
        const { admin, username, userId } = user;
        return res.status(200).cookie("authToken", token, cookieOptions).json({
          user: { admin, username, userId },
        });
      } else {
        throw Error("Password does not match.");
      }
    } catch (e) {
      console.log(e);
      return res
        .status(401)
        .json({ error: "Contraseña o usuario incorrectos." });
    }
  })
  .get("/me", async (req, res) => {
    const {
      cookies: { authToken },
    } = req;

    if (!authToken) {
      return res.status(403).json({
        msg: "Forbidden",
      });
    } else {
      try {
        const result = await verifyToken(authToken);

        res.status(200).json({
          user: result.user,
        });
      } catch (e) {
        console.log(e);
        return res.status(401).json({
          msg: "Unauthorized",
        });
      }
    }
  })
  .get("/logout", async (req, res) => {
    return res.status(200).clearCookie("authToken", cookieOptions).json({
      msg: "Ha salido exitosamente.",
    });
  });
