const router = require('express').Router();

const fundingController = require('../controllers/prjt_fundings');

router.post('/find/funding/:id', fundingController.updateFunding);

router.delete('/delete/funding/:id', fundingController.deleteFunding);

router.get('/find/funding/:id', fundingController.getOneFunding);

router.get('/add/fundings/:project_id', fundingController.getOneByProjectId)

router.post('/add/fundings/:project_id', fundingController.createFundingByProjectId)

module.exports = router;