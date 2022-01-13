const router = require('express').Router()
const gatewayController = require('../controllers/apiGatewayModel')

router.get('/getModel', gatewayController.getModel);

router.post('/postModel', gatewayController.postModel)

router.post('/postAttributes', gatewayController.postAttributes)

router.get('/getConsumption', gatewayController.getConsumption)

router.get('/getAlarm', gatewayController.getMeterAlarm)

router.get('/getAlarmSteward', gatewayController.getMeterAlarmBySteward)

module.exports = router