const router = require('express').Router()

const topupHistoryController = require('../controllers/topupHistoryController')

router.get('/dashboard', topupHistoryController.get)

module.exports = router