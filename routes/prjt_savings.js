const router = require('express').Router();
const authorization = require('../middleware/authorization')

const savingsController = require('../controllers/prjt_savings');

router.post('/find_savings_values', savingsController.createSavings);

router.post('/find/savings/:id', savingsController.updateSavings);

router.delete('/delete/savings/:id', savingsController.deleteSavings);

router.get('/find/savings/:id', authorization.checkNotAuthenticated,  savingsController.getOneSavings);

module.exports = router