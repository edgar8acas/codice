import bcrypt from "bcrypt";

export const extractWordFromOccurrence = (o) => {
  return o.word;
};

export const hashPasswordHook = (user) => {
  if (!user.changed("password")) return;
  return bcrypt
    .hash(user.getDataValue("password"), 10)
    .then((hash) => user.setDataValue("password", hash));
};

export const checkPassword = (encrypted, original) => {
  return bcrypt.compare(original, encrypted);
};
