const router = require('express').Router();
const authorization = require('../../middleware/authorization')

const costsHoursController = require('../../controllers/ecmForms/prjt_costs_hours');

router.post('/update/costs_hours/:id', costsHoursController.updateCostsHours);

router.delete('/delete/costs_hours/:id', costsHoursController.deleteCostsHours);

router.get('/ecmforms/costs_hours/:id',  authorization.checkNotAuthenticated, costsHoursController.getOneCostsHours);

router.post('/costs_hours', costsHoursController.createCostsHours);

module.exports = router;
