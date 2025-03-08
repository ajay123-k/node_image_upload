const router = require("express").Router();
const userController = require("../controllers/users");

router.post("/register", userController.registration);

router.post("/login", userController.login);

module.exports = router;
