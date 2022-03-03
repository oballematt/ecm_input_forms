const router = require('express').Router()
const attributeController = require('../../controllers/meterValidation/meterAttributes')

router.post('/getAttributes', attributeController.getAttributes)

module.exports = router