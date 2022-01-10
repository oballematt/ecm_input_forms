const router = require('express').Router();
const getOneByIdController = require('../controllers/getDataById');
const authorization = require('../middleware/authorization')

<<<<<<< HEAD
router.post('/ecmforms', getOneByIdController.findData);

router.get('/ecmforms', authorization.checkNotAuthenticated, getOneByIdController.getAllPid);
=======
router.post('/ecmprojectsform', getOneByIdController.findData);

router.get('/ecmprojectsform', authorization.checkNotAuthenticated, getOneByIdController.getAllPid);
>>>>>>> 36b641ec3880609cf88e1aef1dd7d217bbd72a9d

router.get('/delete/all/:project_id', getOneByIdController.deleteAllData);

module.exports = router