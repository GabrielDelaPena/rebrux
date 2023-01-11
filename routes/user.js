const router = require("express").Router();

const userController = require("../controllers/user");

router.get("/", userController.getUsers);

router.get("/:userId", userController.getUserById);

router.post("/register", userController.register);

router.post("/login", userController.login);

router.post("/edit/:userID", userController.editUser);

router.post("/password/update", userController.changePassword);

module.exports = router;
