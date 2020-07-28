const express = require("express");
// const path = require("path");
// const mongoose = require("mongoose");
// const morgan = require("morgan");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const expressValidator = require("express-validator");
// const cors = require("cors");
// require("dotenv").config();

// Routes
const routes = require("./routes");

const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(morgan("dev"));
// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(expressValidator());
// app.use(cors());

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// routes middleware
app.use(routes);

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
