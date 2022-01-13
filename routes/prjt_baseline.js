const router = require('express').Router();

const baselineController = require('../controllers/prjt_baseline');

router.post('/baseline', baselineController.createBaseline);

router.post('/update/baseline/:id', baselineController.updateBaseline);

router.delete('/delete/baseline/:id', baselineController.deleteBaseline);

module.exports = router