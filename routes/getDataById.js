const router = require('express').Router();
const getOneByIdController = require('../controllers/getDataById');
const authorization = require('../middleware/authorization')

router.post('/', getOneByIdController.findData);

router.get('/', authorization.checkNotAuthenticated, getOneByIdController.getAllPid);

router.get('/delete/all/:project_id', getOneByIdController.deleteAllData);

module.exports = router