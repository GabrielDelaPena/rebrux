const mongoose = require("mongoose");
const User = require("../models/User");

exports.getUser = async (req, res, next) => {
  const userID = req.params.userID;

  try {
    const user = await User.findOne({ _id: userID });
    console.log("USER FETCHED");
    res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("An error occured in the server, we are currently fixing it.");
  }
};
