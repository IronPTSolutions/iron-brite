const Session = require("../models/session.model");
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
              Session.create({ user: user.id })
                .then((session) => {
                  res.setHeader("Set-Cookie", `session=${session.id}`);
                  res.json(user);
                })
                .catch(next);
            } else {
              next(createError(401, "bad credentials"));
            }
          })
          .catch(next);
      } else {
        next(createError(401, "bad credentials"));
      }
    })
    .catch(next);
};
