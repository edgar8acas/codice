import jwt from "jsonwebtoken";
/**
 * TODO: Secure token generation key
 * For development purposes having the key hardcoded here it's fine,
 * but it should ideally be generated from a certificate generation utility,
 * placed in a file and obtained from there.
 */

// This is totally insecure should only be used for development enviroment.
const secret = "some-random-key";

export const generateToken = (user) => {
  const data = {
    user: {
      username: user.username,
      admin: user.admin,
      userId: user.userId,
    },
  };
  return new Promise((resolve, reject) => {
    jwt.sign(
      data,
      secret,
      {
        expiresIn: "12h",
      },
      (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      }
    );
  });
};
/**
 *
 * @param {string} token
 */
export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
};
