const mongoose  = require('mongoose')

const dbConn = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('database connected')
  } catch (error) {
    console.log(error);
  }
}

module.exports = dbConn