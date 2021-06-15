const router = require('express').Router();

const predictedController = require('../controllers/predicted');

router.get('/predicted/:project_id', predictedController.getData);

module.exports = router