const router = require('express').Router()
const attributeController = require('../controllers/meterAttributes')

router.post('/attributes', attributeController.submitAttributes)

router.post('/getAttributes', attributeController.getAttributes)

router.post('/updateAttributes/:id', attributeController.updateAttributes)

module.exports = router