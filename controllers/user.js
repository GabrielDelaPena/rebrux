const mongoose = require("mongoose");
const User = require("../models/User");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    console.log("USERS FETCHED");
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("An error occured in the server, we are currently fixing it.");
  }
};

// exports.addUser = async (req, res, next) => {
//   const user = new User({
//     username: req.body.username,
//     password: req.body.password,
//     email: req.body.email,
//     reports: [],
//   });

//   try {
//     await user.save();
//     console.log("USER CREATED");
//     res.status(200).json({ user });
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .send("An error occured in the server, we are currently fixing it.");
//   }
// };
