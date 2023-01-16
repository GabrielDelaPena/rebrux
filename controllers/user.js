const User = require("../models/User");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    console.log("USERS FETCHED");
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("An error occured in the server, we are currently fixing it.");
  }
};

exports.register = async (req, res, next) => {
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) {
    return res.status(400).send("Email already exist.");
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  const user = new User({
    role: "User",
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email,
    street: "",
    city: "",
    zip: "",
    phone: "",
    points: 0,
  });

  try {
    const savedUser = await user.save();
    console.log("USER CREATED");
    res
      .status(200)
      .send(`User ${savedUser.username} has been successfully registered.`);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("An error occured in the server, we are currently fixing it.");
  }
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Email does not exist.");
  }

  const isEqual = await bcrypt.compare(req.body.password, user.password);
  if (!isEqual) {
    return res.status(400).send("Email or Password invalid.");
  }

  try {
    console.log("USER LOGGEDIN");
    res.status(200).send(user._id.toString());
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("An error occured in the server, we are currently fixing it.");
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(400).send("User not found!");
    }

    console.log("SINGLE USER FETCHED.");
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("An error occured in the server, we are currently fixing it.");
  }
};

exports.editUser = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const userID = req.params.userID;

  try {
    const user = await User.findOne({ _id: userID });
    if (!user) {
      return res.status(400).send("User not found!");
    }

    user.username = username;
    user.email = email;
    console.log("USER UPDATED");
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("An error occured in the server, we are currently fixing it.");
  }
};

exports.changePassword = async (req, res) => {
  const userEmail = req.body.email;

  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(400).send("User not found!");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    user.password = hashedPassword;
    await user.save();
    console.log("PASSWORD UPDATED");
    res.status(200).send("User updated password successfully.");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("An error occured in the server, we are currently fixing it.");
  }
};
