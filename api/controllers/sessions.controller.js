const User = require("../models/user.model");
const createError = require("http-errors");

module.exports.create = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        user
          .checkPassword(password)
          .then((match) => {
            if (match) {
              // if (!user.active) {
              //   next(createError(401, "user not active"));
              //   return;
              // }

              req.session.userId = user.id;
              res.status(201).json(user);
            } else {
              next(createError(401, {
                message: "Bad credentials",
                errors: { email: "Invalid email or password" },
              }))
            }
          })
          .catch(next);
      } else {
        next(createError(401, {
          message: "Bad credentials",
          errors: { email: "Invalid email or password" },
        }))
      }
    }).catch(next);
};

module.exports.destroy = (req, res, next) => {
  req.session.destroy();
  res.status(204).send();
};
