const User = require("../models/user.model");
const Session = require("../models/session.model");
const createError = require("http-errors");

module.exports.checkSession = (req, res, next) => {
  const sessionId = req.headers.cookie?.split("session=")[1];

  if (!sessionId) {
    next(createError(401, "missing session from authorization header"));
  }

  Session.findById(sessionId)
    .then((session) => {
      if (session) {
        User.findById(session.user)
          .then((user) => {
            if (user) {
              // update last access time to keep session alive
              session.lastAccess = new Date();
              session.save();

              // leave user on req object so next middlewares can access to it
              req.user = user;

              // continue to next middleware or controller
              next();
            } else {
              next(createError(401, "unauthorized. wrong user"));
            }
          })
          .catch(next);
      } else {
        next(createError(401, "unauthorized. session not found"));
      }
    })
    .catch(next);
};
