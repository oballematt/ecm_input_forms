const router = require('express').Router();

const baselineController = require('../controllers/prjt_baseline');

router.post('/ecmprojectsform/baseline', baselineController.createBaseline);

router.post('/ecmprojectsform/baseline/:id', baselineController.updateBaseline);

router.delete('/delete/baseline/:id', baselineController.deleteBaseline);

module.exports = router