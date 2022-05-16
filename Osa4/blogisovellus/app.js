const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const { MONGODB_URI } = require("./utils/config");
const { info, error } = require("./utils/logger");
const testingRouter = require("./controllers/testing");

console.log(MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => info("Connected"))
  .catch((err) => error("Connection failed ", err.message));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
