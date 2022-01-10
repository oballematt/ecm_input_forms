const router = require('express').Router()
const authorization = require('../middleware/authorization')

const metadataController = require('../controllers/prjt_metadata')

router.post('/ecmforms/metadata', metadataController.createMetadata)

router.get('/ecmforms/metadata', authorization.checkNotAuthenticated, metadataController.getBuildings)

router.post('/ecmforms/:project_id', metadataController.updateMetaData);

router.get('/delete/:project_id', metadataController.deleteMetaData);

router.get('/ecmforms/:project_id', metadataController.getOneMetaData);

module.exports = router