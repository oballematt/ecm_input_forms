const router = require('express').Router();

const costsHoursController = require('../controllers/prjt_costs_hours');

router.post('/find/costs_hours/:id', costsHoursController.updateCostsHours);

router.get('/delete/costs_hours/:id', costsHoursController.deleteCostsHours);

router.get('/find/costs_hours/:id', costsHoursController.getOneCostsHours);

router.get('/add/costs_hours/:project_id', costsHoursController.getOneByProjectId)

router.post('/add/costs_hours/:project_id', costsHoursController.createByProjectId)

module.exports = router;
