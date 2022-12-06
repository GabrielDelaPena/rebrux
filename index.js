const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

// import routes
const userRoutes = require("./routes/user");

// configuration
const app = express();
dotenv.config();

// middleware
app.use(express.json());
app.use(cors());

// routes middleware
app.use("/", userRoutes);

// DB connection
mongoose
  .connect(process.env.DB_CONNECTION, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log("CONNECTED TO DB");
    app.listen(8081);
  })
  .catch((error) => {
    console.log(error);
  });
