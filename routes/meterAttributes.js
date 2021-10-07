const router = require('express').Router()
const attributeController = require('../controllers/meterAttributes')

router.post('/attributes', attributeController.submitAttributes)

module.exports = router