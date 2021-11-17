const router = require('express').Router()
const gatewayController = require('../controllers/apiGatewayModel')

router.get('/gateway', gatewayController.getModel);

router.post('/postGateway', gatewayController.postModel)

module.exports = router