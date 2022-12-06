const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");
const { sendMail } = require("../utils/sendMessage");

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

  // Body data
  const username = req.body.username;
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

    sendMail({
      to: user.email,
      from: "delapena.gabriel12@gmail.com",
      subject: "Thanks for joining!",
      html: "<h4>We are happy you join us!!!</h4><br><h5>Please <a href='http://localhost:3000/forgetpassword'>login</a> to your new account </5>",
    });

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

exports.forgetPassword = async (req, res, next) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send("User not found!");
    }

    sendMail({
      to: user.email,
      from: "delapena.gabriel12@gmail.com",
      subject: "Thanks for joining!",
      html: `<h4>Please click on this <a href="http://localhost:3000/resetpassword/${user._id}">link</a></h4>`,
    });

    res.status(200).json({ userID: user._id });
  } catch (error) {
    console.log("Something wen't wrong while sending email.");
  }
};

exports.resetPassword = async (req, res, next) => {
  const userID = req.params.userID;
  const password = req.body.password;

  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(400).send("User not found!");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    await user.save();
    console.log("Password reset success!");
    res
      .status(200)
      .json({ userID: user._id, message: "Reset password success." });
  } catch (error) {
    console.log(error);
  }
};
