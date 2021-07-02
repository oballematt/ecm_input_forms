const router = require('express').Router();

const costsHoursController = require('../controllers/prjt_costs_hours');

router.post('/find/costs_hours/:id', costsHoursController.updateCostsHours);

router.delete('/delete/costs_hours/:id', costsHoursController.deleteCostsHours);

router.get('/find/costs_hours/:id', costsHoursController.getOneCostsHours);

router.post('/add_costs_hours', costsHoursController.createCostsHours);

module.exports = router;
