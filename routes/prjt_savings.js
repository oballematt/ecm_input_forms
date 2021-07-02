const router = require('express').Router();

const savingsController = require('../controllers/prjt_savings');

router.post('/find_savings_values', savingsController.createSavings);

router.post('/find/savings/:id', savingsController.updateSavings);

router.delete('/delete/savings/:id', savingsController.deleteSavings);

router.get('/find/savings/:id', savingsController.getOneSavings);

module.exports = router