const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router
    .get('/signup', authController.getSignupForm)
    .post('/signup', authController.postSignupForm)

router
    .get('/login', authController.getLoginForm)
    .post('/login', authController.postLoginForm)

router.post('/logout', authController.logout)

module.exports = router