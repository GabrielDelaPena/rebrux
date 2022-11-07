const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");

const User = require("../models/User");

exports.register = async (req, res, next) => {
  // Validate data before adding new user
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send("Some of the fields are invalid.");
  }

  // Check if user exist already
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) {
    return res.status(400).send("Email already have a account.");
  }

  // Check for password confirmation
  if (req.body.password !== req.body.passwordConfirm) {
    return res.status(400).send("The password doesn't match.");
  }

  // Body data
  const username = req.body.email;
  const password = req.body.password;
  const email = req.body.email;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // New user object
  const user = new User({
    username: username,
    password: hashedPassword,
    email: email,
    reports: [],
  });

  // Trycatch save new user
  try {
    const userSave = await user.save();
    console.log("USER CREATED");
    res.status(200).json({ userID: userSave._id });
  } catch (error) {
    res
      .status(500)
      .send("An error occured in the server, we are currently fixing it.");
  }
};

exports.login = async (req, res, next) => {
  // Valdiate before logging user
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send("Some of the fields are invalid.");
  }

  // Checking if user exist
  const userExist = await User.findOne({ email: req.body.email });
  if (!userExist) {
    return res
      .status(400)
      .send("User with given email not found, please register.");
  }

  // Password validation
  const isEqual = await bcrypt.compare(req.body.password, userExist.password);
  if (!isEqual) {
    return res.status(400).send("Invalid password, please try again.");
  }

  // Create and assign token, set token to header and send token to client side
  try {
    const token = jwt.sign(
      {
        userID: userExist._id,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    console.log("USER LOGGED IN");
    res.status(200).json({ token: token, userID: userExist._id });
  } catch (error) {
    res
      .status(500)
      .send("An error occured in the server, we are currently fixing it.");
  }
};
