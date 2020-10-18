/// <reference types="node"/>

import { verifyToken } from "@/utils/jwt";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const authenticate = async (req, res, next) => {
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
