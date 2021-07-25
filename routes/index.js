const router = require('express').Router()
const {authenticate} = require('../middlewares/auth')
const userRouter = require('./user')
const topupHistoryRouter = require('./topupHistory')

router.use(userRouter)
// router.use(authenticate)
router.use(topupHistoryRouter)

module.exports = router