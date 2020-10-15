import express from "express";
import { User } from "@models";
import { checkPassword } from "../utils/helpers";
import { generateToken } from "../utils/jwt";

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
      const token = await generateToken(user);
      return res
        .status(200)
        .cookie("Authorization", token, { httpOnly: true })
        .json({ msg: "Usuario autenticado.", token });
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
