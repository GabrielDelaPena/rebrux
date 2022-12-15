const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Register
exports.register = async (req, res, next) => {
  // Check if user exist already
  const existUser = await User.findOne({ email: req.body.email });
  if (existUser) {
    return res.status(400).send("User already exist.");
  }

  // Body data
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // New user object
  const user = new User({
    email: email,
    username: username,
    password: hashedPassword,
    reports: [],
  });

  try {
    const savedUser = await user.save();
    console.log("USER CREATED");
    res
      .status(200)
      .json({ userId: savedUser._id, message: "New user created." });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

// Login
exports.login = async (req, res, next) => {
  // Checking if user exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send("Email not found.");
  }

  // Password validation
  const isEqual = await bcrypt.compare(req.body.password, user.password);
  if (!isEqual) {
    return res.status(404).send("Invalid password.");
  }

  console.log("USER LOGGEDIN");
  res
    .status(200)
    .json({ userId: user._id, message: "User successfully logged in." });
};
