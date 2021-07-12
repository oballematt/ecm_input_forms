const router = require('express').Router();
const authorization = require('../middleware/authorization')

const baselineController = require('../controllers/prjt_baseline');

router.post('/find_b_s_values', baselineController.createBaseline);

router.post('/find/baseline/:id', baselineController.updateBaseline);

router.delete('/delete/baseline/:id', baselineController.deleteBaseline);

router.get('/find/baseline/:id',  authorization.checkNotAuthenticated, baselineController.getOneBaseline);


module.exports = router