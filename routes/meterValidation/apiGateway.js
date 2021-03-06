const router = require('express').Router()
const gatewayController = require('../../controllers/meterValidation/apiGatewayModel')

router.get('/getModel', gatewayController.getModel);

router.post('/postReplacement', gatewayController.postReplacement)

router.post('/postAttributes', gatewayController.postAttributes)

router.get('/getConsumption', gatewayController.getConsumption)

router.post('/getAlarm', gatewayController.getMeterAlarm)

router.post('/postModelNotes', gatewayController.postModelNotes)

module.exports = router