/// <reference types="node"/>

import { verifyToken } from "@/utils/jwt";

/**
 * @requires express
 */
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const authenticate = async (req, res, next) => {
  const {
    headers: { authorization },
  } = req;

  if (!authorization) {
    return res.status(403).json({
      msg: "Forbidden",
    });
  } else {
    try {
      const result = await verifyToken(authorization);

      res.locals.user = result;
      res.locals.auth = true;
      next();
    } catch (e) {
      console.log(e);
      return res.status(401).json({
        msg: "Unauthorized",
      });
    }
  }
};
