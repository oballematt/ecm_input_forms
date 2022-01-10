const router = require('express').Router();

const savingsController = require('../controllers/prjt_savings');

router.post('/ecmprojectsform/savings', savingsController.createSavings);

router.post('/ecmprojectsform/savings/:id', savingsController.updateSavings);

router.delete('/delete/savings/:id', savingsController.deleteSavings);


module.exports = router