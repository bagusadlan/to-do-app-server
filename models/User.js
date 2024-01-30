const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const bcryptSalt = bcrypt.genSaltSync(10)

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', async function (next) {
  try {
    if (this.password && this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, bcryptSalt)
    }
    next()
  } catch (err) {
    next(err)
  }
})

module.exports = mongoose.model('User', userSchema)