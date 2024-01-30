const express = require('express')
const {
  register,
  login,
  logout,
  getProfile
} = require('../controllers/AuthController.js')

// const { JWTMiddleware } = require('../middleware/JWTMiddleware.js')

const router = express.Router()

router.post('/register', register)
router.post('/', login)
router.post('/:id', logout)
router.get('/:id', getProfile)

module.exports = router
