const express = require('express')
const {
  register,
  login,
  logout,
  getProfile
} = require('../controllers/AuthController.js')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/profile', getProfile)

module.exports = router
