const router = require('express').Router();
const authorization = require('../middleware/authorization')


const miscSavingsController = require('../controllers/prjt_misc_savings');

router.post('/find/miscsavings/:id', miscSavingsController.updateMiscSavings);

router.delete('/delete/miscsavings/:id', miscSavingsController.deleteMiscSavings);

router.get('/find/miscsavings/:id', authorization.checkNotAuthenticated,  miscSavingsController.getOneMiscSavings);

router.post('/add_miscsavings', miscSavingsController.createMiscSavings);


module.exports = router