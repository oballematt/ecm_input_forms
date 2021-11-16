const router = require('express').Router()
const gatewayController = require('../controllers/apiGatewayModel')

router.post('/gateway', gatewayController.getModel);

module.exports = router