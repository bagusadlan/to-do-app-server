const express = require('express')
const mongoose = require('mongoose')

const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
// const morgan = require('morgan')
const cors = require('cors')
// const { sequelize } = require('./models')
const config = require('./config/config')
require('dotenv').config()
const TodoRoute = require('./routes/TodoRoute')
const AuthRoute = require('./routes/AuthRoute')
const connectDB = require('./config/dbConn')
connectDB()

const app = express()
// app.use(morgan('combined'))
app.use(bodyParser.json())
// app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173'
  })
)

app.use('/', AuthRoute)
app.use('/to-do', TodoRoute)
// app.use('/api/complaints', ComplaintRoute)
// app.use('/api/profile', UserProfileRoute)

mongoose.connection.once('open', () => {
  app.listen(config.port, () => {
    console.log(`server running on port: ${config.port}`)
  })
})

mongoose.connection.on('error', (err) => {
  console.log(err)
})
