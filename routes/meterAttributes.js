const router = require('express').Router()
const attributeController = require('../controllers/meterAttributes')

router.post('/getAttributes', attributeController.getAttributes)

module.exports = router