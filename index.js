const express = require('express')
const mongoose = require('mongoose')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const config = require('./config/config')
require('dotenv').config()
const TodoRoute = require('./routes/TodoRoute')
const AuthRoute = require('./routes/AuthRoute')
const connectDB = require('./config/dbConn')
connectDB()

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: 'https://to-do-app-bagus.vercel.app/'
  })
)

app.use('/', AuthRoute)
app.use('/to-do', TodoRoute)

mongoose.connection.once('open', () => {
  app.listen(config.port, () => {
    console.log(`server running on port: ${config.port}`)
  })
})

mongoose.connection.on('error', (err) => {
  console.log(err)
})
