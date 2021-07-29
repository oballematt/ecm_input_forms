const router = require('express').Router();
const usersController = require("../controllers/users");

router.post('/register', usersController.createUser);

router.post('/reset', usersController.resetPassword)

module.exports = router