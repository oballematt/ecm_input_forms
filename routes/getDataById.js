const router = require('express').Router();

const getOneByIdController = require('../controllers/getDataById');

router.post('/', getOneByIdController.findData);

router.get('/', getOneByIdController.getAllPid);

router.get('/delete/all/:project_id', getOneByIdController.deleteAllData);

module.exports = router