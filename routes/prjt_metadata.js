const router = require('express').Router()

const metadataController = require('../controllers/prjt_metadata')

router.post('/metadata', metadataController.createMetadata)

router.get('/metadata', metadataController.getBuildings)

router.post('/find/:project_id', metadataController.updateMetaData);

router.get('/delete/:project_id', metadataController.deleteMetaData);

router.get('/find/:project_id', metadataController.getOneMetaData);

module.exports = router