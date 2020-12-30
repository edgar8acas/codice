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
      const { user } = await verifyToken(authToken);

      res.locals.user = user;
      res.locals.isAuthenticated = true;
      next();
    } catch (e) {
      console.log(e.message);
      return res.status(401).json({
        msg: "Unauthorized",
      });
    }
  }
};
