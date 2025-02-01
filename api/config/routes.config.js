const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const createError = require("http-errors");
const events = require("../controllers/events.controller");
const users = require("../controllers/users.controller");
const sessions = require("../controllers/sessions.controller");
const auth = require("../middlewares/session.middleware");

router.get("/events", auth.checkSession, events.list);
router.post("/events", auth.checkSession, events.create);
router.get("/events/:id", auth.checkSession, events.detail);
router.delete("/events/:id", auth.checkSession, events.delete);
router.patch("/events/:id", auth.checkSession, events.update);

router.post("/users", users.create);

router.post("/sessions", sessions.create);

router.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

router.use((error, req, res, next) => {
  if (
    error instanceof mongoose.Error.CastError &&
    error.message.includes("_id")
  )
    error = createError(404, "Resource not found");
  else if (error instanceof mongoose.Error.ValidationError)
    error = createError(400, error);
  else if (!error.status) error = createError(500, error.message);
  console.error(error);

  const data = {};
  data.message = error.message;
  if (error.errors) {
    data.errors = Object.keys(error.errors).reduce((errors, errorKey) => {
      errors[errorKey] =
        error.errors[errorKey]?.message || error.errors[errorKey];
      return errors;
    }, {});
  }
  res.status(error.status).json(data);
});

module.exports = router;
