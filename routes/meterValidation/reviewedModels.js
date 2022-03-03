const router = require('express').Router()
const reviewedModelsController = require('../../controllers/meterValidation/reviewedModel')

router.get('/reviewedModels', reviewedModelsController.getModels)

router.post('/postModels', reviewedModelsController.postModel)

router.delete('/deleteModels', reviewedModelsController.deleteModels)

module.exports = router