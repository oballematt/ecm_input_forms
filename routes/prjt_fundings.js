const router = require('express').Router();
const authorization = require('../middleware/authorization')

const fundingController = require('../controllers/prjt_fundings');

router.post('/ecmprojectsform/funding/:id', fundingController.updateFunding);

router.delete('/delete/funding/:id', fundingController.deleteFunding);

router.get('/ecmprojectsform/funding/:id', authorization.checkNotAuthenticated, fundingController.getOneFunding);

router.post('/ecmprojectsform/funding', fundingController.createFunding);

module.exports = router;