const router = require('express').Router();
const authorization = require('../middleware/authorization')


const miscSavingsController = require('../controllers/prjt_misc_savings');

router.post('/ecmprojectsform/miscsavings/:id', miscSavingsController.updateMiscSavings);

router.delete('/delete/miscsavings/:id', miscSavingsController.deleteMiscSavings);

router.get('/ecmprojectsform/miscsavings/:id', authorization.checkNotAuthenticated,  miscSavingsController.getOneMiscSavings);

router.post('/ecmprojectsform/miscsavings', miscSavingsController.createMiscSavings);


module.exports = router