const router = require("express").Router();

const userController = require("../controllers/user");

router.get("/", userController.getUsers);

router.post("/register", userController.register);

router.post("/login", userController.login);

module.exports = router;
