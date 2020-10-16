import express from "express";
import { Dictionary } from "@/models";

const router = express.Router();

export default router.put("/", async (req, res) => {
  const { body } = req;
  let item;
  try {
    //TODO: Filter fields
    item = await Dictionary.findByPk(body.dictionaryId);

    if (item === null)
      return res
        .status(404)
        .json({ msg: "Palabra de diccionario no encontrada" });

    await item.update({
      isLearned: body.isLearned,
    });

    const updated = await Dictionary.findByPk(item.dictionaryId);
    return res.status(201).json(updated);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Error del servidor" });
  }
});
