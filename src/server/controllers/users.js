import express from "express";
import { User } from "@/models";

const router = express.Router();

export default router.post("/", async (req, res) => {
  const { body } = req;

  try {
    await User.create(body);
    return res.status(200).json({ msg: "Usuario creado." });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
});
