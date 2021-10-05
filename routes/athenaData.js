const router = require('express').Router()
const athenaController = require('../config/athena')
const buildingController = require('../controllers/cleaningBuildings')
const authorization = require('../middleware/authorization')

router.post('/athenaData', athenaController.getData)

router.get('/datacleaning', authorization.checkNotAuthenticated, buildingController.getBuildings)

router.get('/athenaDataMeters', athenaController.getAllMeters)

router.post('/buildings', buildingController.getBuildingsBySteward)

module.exports = router