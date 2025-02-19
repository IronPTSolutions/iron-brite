const cors = require("cors");

const CORS_ORIGINS = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim());

module.exports.cors = cors({
  origin: CORS_ORIGINS,
  credentials: true,
});
