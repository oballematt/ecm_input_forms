const router = require('express').Router();

const getOneByIdController = require('../controllers/getDataById');

router.post('/find', getOneByIdController.findData)

module.exports = router