const router = require('express').Router();

const baselineController = require('../controllers/prjt_baseline');

router.post('/baseline', baselineController.createBaseline);

router.get('/baseline', baselineController.getForm);

router.post('/find/baseline/:id', baselineController.updateBaseline);

router.get('/delete/baseline/:id', baselineController.deleteBaseline);

router.get('/find/baseline/:id', baselineController.getOneBaseline);

router.get('/add/baseline/:project_id', baselineController.getOneByProjectId)

router.post('/add/baseline/:project_id', baselineController.createBaseline)


module.exports = router