const router = require('express').Router();

const savingsController = require('../controllers/prjt_savings');

router.post('/savings', savingsController.createSavings);

router.post('/update/savings/:id', savingsController.updateSavings);

router.delete('/delete/savings/:id', savingsController.deleteSavings);


module.exports = router