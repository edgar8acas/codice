import bcrypt from "bcrypt";

export const extractWordFromOccurrence = (o) => {
  return o.word;
};

export const hashPasswordHook = (user) => {
  if (!user.changed("password")) return;
  return bcrypt
    .hash(user.getDataValue("password"), 10)
    .then((hash) => user.setDataValue("password", hash));
  // return new Promise((resolve, reject) => {
  //   if(user.changed('password')) {
  //     bcrypt.hash(user.getDataValue('password'), 10, (err, hashed) => {
  //       if (err) reject(err);
  //       resolve(hashed);
  //     })
  //   }
  //   return
  // }).then((hashed) => {
  //   user.setDataValue('password', hashed);
  // })
};
