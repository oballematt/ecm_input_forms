const router = require('express').Router()
const authorization = require('../middleware/authorization')

const metadataController = require('../controllers/prjt_metadata')

router.post('/ecmprojectsform/metadata', metadataController.createMetadata)

router.get('/ecmprojectsform/metadata', authorization.checkNotAuthenticated, metadataController.getBuildings)

router.post('/ecmprojectsform/:project_id', metadataController.updateMetaData);

router.get('/delete/:project_id', metadataController.deleteMetaData);

router.get('/ecmprojectsform/:project_id', metadataController.getOneMetaData);

module.exports = router