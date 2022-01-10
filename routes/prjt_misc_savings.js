const router = require('express').Router();
const authorization = require('../middleware/authorization')


const miscSavingsController = require('../controllers/prjt_misc_savings');

router.post('/update/miscsavings/:id', miscSavingsController.updateMiscSavings);

router.delete('/delete/miscsavings/:id', miscSavingsController.deleteMiscSavings);

router.get('/ecmforms/miscsavings/:id', authorization.checkNotAuthenticated,  miscSavingsController.getOneMiscSavings);

router.post('/miscsavings', miscSavingsController.createMiscSavings);


module.exports = router