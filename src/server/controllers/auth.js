import express from "express";
import { User } from "@models";
import { checkPassword } from "../utils/helpers";

const router = express.Router();

export default router.post("/", async (req, res) => {
  /** TODO: Verify credentials and issue an authentication token
   * 1. Receive user credentials
   * 2. Validate credentials
   * 3. Generate token
   * 4. Return token
   */

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) throw Error("User does not exist.");

    const match = await checkPassword(user.password, password);

    if (match) {
      //Issue token
      return res.status(200).json({ msg: "Usuario autenticado." });
    } else {
      throw Error("Password does not match.");
    }
  } catch (e) {
    console.log(e);
    return res
      .status(401)
      .json({ msg: "No fue posible autenticar al usuario." });
  }
});
