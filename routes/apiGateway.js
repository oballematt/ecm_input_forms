const router = require('express').Router()
const gatewayController = require('../controllers/apiGatewayModel')

router.get('/gateway', gatewayController.getModel);

module.exports = router