const createError = require("http-errors");
const User = require("../models/user.model");
const { sendValidationEmail } = require("../config/mailer.config");

module.exports.create = (req, res, next) => {
  const { email } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        next(
          createError(400, {
            message: "User email already taken",
            errors: { email: "Already exists" },
          })
        );
      } else {
        return User.create({
          email: req.body.email,
          password: req.body.password,
          name: req.body.name,
          avatar: req.body.avatar,
        }).then((user) => {
          sendValidationEmail(user);

          res.status(201).json(user);
        });
      }
    })
    .catch((error) => next(error));
};

module.exports.update = (req, res, next) => {
  const permittedBody = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    avatar: req.body.avatar,
  };

  // remove undefined keys
  Object.keys(permittedBody).forEach((key) => {
    if (permittedBody[key] === undefined) {
      delete permittedBody[key];
    }
  });

  // merge body into req.user object
  Object.assign(req.user, permittedBody);

  req.user
    .save()
    .then((user) => res.json(user))
    .catch(next);
};

module.exports.validate = (req, res, next) => {
  User.findOne({ _id: req.params.id, activateToken: req.query.token })
    .then((user) => {
      if (user) {
        user.active = true;
        user.save().then((user) => res.json(user));
      } else {
        next(createError(404, "User not found"));
      }
    })
    .catch(next);
};
