const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoutes = require("./routes/user");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.status(200).json("Welcome to my API");
});

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`backend server started on port ${PORT}`);
  mongoose
    .connect(process.env.MONGODB)
    .then((result) => console.log("mongodb connected"))
    .catch((error) => console.log(error));
});
