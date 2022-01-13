const router = require('express').Router();
const authorization = require('../middleware/authorization')

const fundingController = require('../controllers/prjt_fundings');

router.post('/update/funding/:id', fundingController.updateFunding);

router.delete('/delete/funding/:id', fundingController.deleteFunding);

router.get('/ecmforms/funding/:id', authorization.checkNotAuthenticated, fundingController.getOneFunding);

router.post('/funding', fundingController.createFunding);

module.exports = router;