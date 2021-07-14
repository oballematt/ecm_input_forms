const router = require('express').Router();
const usersController = require("../controllers/users");

router.post('/register', usersController.createUser);

module.exports = router