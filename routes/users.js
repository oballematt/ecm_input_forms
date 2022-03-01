const router = require('express').Router();
const usersController = require("../controllers/users");

router.post('/register', usersController.createUser);

router.post('/user/forgot-password', usersController.forgotPassword)

router.get('/user/reset-password', usersController.getResetForm)

router.post('/user/reset-password', usersController.resetPassword)

module.exports = router