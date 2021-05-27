const router = require('express').Router();

const savingsController = require('../controllers/prjt_savings');

router.post('/savings', savingsController.createSavings);

router.get('/savings', savingsController.getForm);

router.post('/find/savings/:id', savingsController.updateSavings);

router.get('/delete/savings/:id', savingsController.deleteSavings);

router.get('/find/savings/:id', savingsController.getOneSavings);


module.exports = router