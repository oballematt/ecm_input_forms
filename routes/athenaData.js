const router = require('express').Router()
const athenaController = require('../config/athena')

router.post('/datacleaning', athenaController.getData)

module.exports = router