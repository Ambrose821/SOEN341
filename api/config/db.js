const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Optional Configurations
    })
    console.log('Database Connected Successfuly')
  } catch (err) {
    console.log('Database Connect Error' + err)
    process.exit(1)
  }
}
module.exports = connectDB
