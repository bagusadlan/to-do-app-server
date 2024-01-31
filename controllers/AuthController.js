const jwt = require('jsonwebtoken')
const User = require('../models/User')
const jwtSecret = process.env.JWT_SECRET

module.exports = {
  async register(req, res) {
    try {
      const { username, email, password } = req.body
      const userExist = await User.findOne({ email })

      if (userExist) {
        return res.status(403).send({
          message: 'User is already exist!'
        })
      }

      const user = await User.create({
        username,
        email,
        password
      })

      const userResponse = {
        username: user.username,
        email: user.email,
        id: user.id
      }

      if (user) {
        jwt.sign(
          {
            username,
            email,
            id: user.id
          },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err

            res.cookie('token', token).status(201).json({
              message: 'Register successfull',
              data: userResponse,
              token
            })
          }
        )
      }
    } catch (error) {
      res.status(500).json({ message: 'Register failed' })
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        return res
          .status(404)
          .json({ message: 'User not found'})
      }

      const isPasswordValid = await user.comparePassword(password)

      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: 'Password is wrong!' })
      }

      const userParse = {
        id: user.id,
        email: user.email,
        username: user.username,
      }

      if (user) {
        jwt.sign(
          userParse,
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err

            res.cookie('token', token).json({
              message: `Hello ${email}!. Welcome to ToDoApp`,
              data: userParse,
              token
            })
          }
        )
      }
    } catch (error) {
      res.status(500).json({
        message: error.message
      })
    }
  },

  async logout(req, res) {
    try {
      res.cookie('token', '').send({
        message: 'logout success'
      })
    } catch (error) {
      res.status(501).send({
        message: 'logout failed'
      })
    }
  },

  async getProfile(req, res) {
    try {
      const { token } = req.cookies

      if (token) {
        jwt.verify(
          token,
          jwtSecret,
          {},
          async (err, userData) => {
            if (err) new Error(err)
            const user = await User.findById(userData.id)

            res.json({
              message: 'Success get profile',
              data: {
                email: user.email,
                username: user.username,
                id: user.id
              }
            })
          }
        )
      } else {
        res.send(null)
      }
    } catch (error) {
      res.status(500).send({
        error: error.message
      })
    }
  }
}
