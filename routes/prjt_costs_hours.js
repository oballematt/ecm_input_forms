const router = require('express').Router();
const authorization = require('../middleware/authorization')

const costsHoursController = require('../controllers/prjt_costs_hours');

router.post('/ecmprojectsform/add/costs_hours/:id', costsHoursController.updateCostsHours);

router.delete('/delete/costs_hours/:id', costsHoursController.deleteCostsHours);

router.get('/ecmprojectsform/costs_hours/:id',  authorization.checkNotAuthenticated, costsHoursController.getOneCostsHours);

router.post('/ecmprojectsform/costs_hours', costsHoursController.createCostsHours);

module.exports = router;
