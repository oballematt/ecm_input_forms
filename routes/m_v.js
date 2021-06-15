const router = require('express').Router();

const predictedController = require('../controllers/m_v');

router.get('/m_v/:project_id', predictedController.getData);

module.exports = router