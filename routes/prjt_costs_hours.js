const router = require('express').Router();

const costsHoursController = require('../controllers/prjt_costs_hours');

router.post('/costs_hours', costsHoursController.createCostsHours);

router.get('/costs_hours', costsHoursController.getForm);

router.post('/find/costs_hours/:id', costsHoursController.updateCostsHours);

router.get('/delete/costs_hours/:id', costsHoursController.deleteCostsHours);

router.get('/find/costs_hours/:id', costsHoursController.getOneCostsHours);

module.exports = router;
