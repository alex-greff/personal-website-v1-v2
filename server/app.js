const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressValidator = require('express-validator');

// Import routes
const projectRoutes = require("./api/routes/projects");
const userRoutes = require("./api/routes/user");
const themeRoutes = require("./api/routes/themes");
const contactRoutes = require("./api/routes/contact");

// Setup connection
mongoose.connect(
  "mongodb://admin:" +
  process.env.MONGO_ATLAS_PW +
  "@personal-cluster-shard-00-00-hujs7.mongodb.net:27017,personal-cluster-shard-00-01-hujs7.mongodb.net:27017,personal-cluster-shard-00-02-hujs7.mongodb.net:27017/personal-website?ssl=true&replicaSet=personal-cluster-shard-0&authSource=admin&retryWrites=true",
  { 
    useNewUrlParser: true
  }
);
mongoose.Promise = global.Promise; // Fixes a thing with mongoose promises

// Setup morgan
app.use(morgan("dev"));

// Setup the uploads directory for storing uploaded files
app.use("/uploads", express.static("uploads"));

// Setup body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup express-validator
app.use(expressValidator());

// Setup headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Setup routes
app.use("/api/projects", projectRoutes);
app.use("/api/user", userRoutes);
app.use("/api/themes", themeRoutes);
app.use("/api/contact", contactRoutes);

// Handle 404 error
// If it gets down there, then there is no route for the given request
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// Handle 500 errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;