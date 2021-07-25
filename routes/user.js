const router = require('express').Router()

const userController = require('../controllers/userController')

router.get('/datauser', userController.get)
router.get('/register', userController.registerView)
router.post('/register', userController.submitRegister)
router.get('/login', userController.loginView)
router.post('/login', userController.submitLogin)

module.exports = router