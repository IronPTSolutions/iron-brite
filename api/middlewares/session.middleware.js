const createError = require("http-errors");
const User = require("../models/user.model");

module.exports.loadSessionUser = (req, res, next) => {
  const { userId } = req.session;
  if (!userId) {
    req.user = undefined;
    next();
  } else {
    User.findById(userId)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((error) => next(error));
  }
}

module.exports.isAuthenticated = (req, res, next) => {
  if (req.user) {
    next(); 
  } else {
    next(createError(401, 'Unauthorized, missing credentials'));
  }
}

module.exports.isAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    next();
  } else {
    next(createError(403, 'Forbidden, insufficient access level'));
  }
}

