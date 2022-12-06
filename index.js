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

// app.get("/", async (req, res) => {
//   try {
//     const users = await User.find();
//     console.log("USERS FETCHED");
//     res.status(200).json(users);
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.post("/", async (req, res) => {
//   try {
//     const user = new User({
//       username: req.body.username,
//       password: req.body.password,
//       email: req.body.email,
//       reports: [],
//     });

//     await user.save();
//     console.log("USERS ADDED");
//     res.status(200).json(user);
//   } catch (error) {
//     console.log(error);
//   }
// });

app.listen(PORT, () => {
  console.log(`backend server started on port ${PORT}`);
  mongoose
    .connect(process.env.MONGODB)
    .then((result) => console.log("mongodb connected"))
    .catch((error) => console.log(error));
});
