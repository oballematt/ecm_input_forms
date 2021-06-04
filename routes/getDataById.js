const router = require('express').Router();

const getOneByIdController = require('../controllers/getDataById');

router.post('/find', getOneByIdController.findData);

router.get('/find', getOneByIdController.getAllPid);

router.get('/delete/all/:project_id', getOneByIdController.deleteAllData);

module.exports = router