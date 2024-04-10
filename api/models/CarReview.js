const mongoose = require('mongoose')

const CarReviewSchema = new mongoose.Schema({

  stars: {
    type: Number,
    require: true
  },
  comment: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  }
})

module.exports = mongoose.model('Reviews', CarReviewSchema)
