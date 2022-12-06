const router = require("express").Router();

const userController = require("../controllers/user");

router.get("/:userID", userController.getUser);

module.exports = router;
