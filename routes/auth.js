const router = require("express").Router();

const authController = require("../controllers/auth");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.put("/resetPassword/:userID", authController.resetPassword);

router.post("/forgetPassword", authController.forgetPassword);

module.exports = router;
