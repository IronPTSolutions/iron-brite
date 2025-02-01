require("dotenv").config();
const express = require("express");
const logger = require("morgan");

/* DB init */
require("./config/db.config");

const app = express();

/* Middlewares */
app.use(express.json());
app.use(logger("dev"));
app.use((req, res, next) => {
  console.log("HOLIIIIIIIIIII");
  next();
});

/* API Routes Configuration */
const routes = require("./config/routes.config");
app.use("/api/v1/", routes);

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.info(`Application running at port ${port}`));
