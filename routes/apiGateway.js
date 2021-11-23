const router = require('express').Router()
const gatewayController = require('../controllers/apiGatewayModel')

router.get('/gateway', gatewayController.getModel);

router.post('/postGateway', gatewayController.postModel)

router.post('/postAttributes', gatewayController.postAttributes)

router.get('/getConsumption', gatewayController.getConsumption)

module.exports = router