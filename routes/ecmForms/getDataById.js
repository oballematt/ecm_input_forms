const router = require('express').Router();
const getOneByIdController = require('../../controllers/ecmForms/getDataById');
const authorization = require('../../middleware/authorization')

router.post('/ecmforms', getOneByIdController.findData);

router.get('/ecmforms', authorization.checkNotAuthenticated, authorization.checkIfAdmin, getOneByIdController.getAllPid);

router.get('/delete/all/:project_id', getOneByIdController.deleteAllData);

module.exports = router