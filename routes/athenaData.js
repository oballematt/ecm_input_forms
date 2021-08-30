const router = require('express').Router()
const athenaController = require('../config/athena')
const buildingController = require('../controllers/cleaningBuildings')

router.post('/athenaData', athenaController.getData)

router.post('/building', buildingController.buildingsBySteward)

router.get('/datacleaning', athenaController.getAllMeters)

module.exports = router