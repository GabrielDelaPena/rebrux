const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// import routes
const authRoutes = require("./routes/auth");

// configuration
const app = express();
dotenv.config();

// middleware
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// routes middleware
app.use("/api/auth", authRoutes);

// DB connection
mongoose.connect(process.env.DB_CONNECTION).then(() => {
  console.log("CONNECTED TO DB");
  app.listen(8081);
});
