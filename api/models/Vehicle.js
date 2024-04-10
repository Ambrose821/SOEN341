const mongoose = require('mongoose')

const VehicleSchema = new mongoose.Schema({
  brand: {
    type: String,
    require: true
  },

  model: {
    type: String,
    required: true
  },
  VIN: {
    type: String,
    required: true
  },
  photoURL: {
    type: String,
    required: true
  },
  plate: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  transmission: {
    // True = Automatic
    // False = Manual
    type: Boolean,
    default: true
  },
  pricePerDay: {
    type: Number,
    required: true
  },
  numberOfSeats: {
    type: Number,
    required: true
  },
  numberOfDoors: {
    type: Number,
    required: true
  },
  style: {
    type: String,
    default: 'sudan',
    enum: ['sudan', 'SUV', 'motorcycle', 'truck', 'convertable']
  },
  reservation: {
    // Array of DateTimes
    type: Object,
    default: []
  },
  lister: {
    type: String,
    required: true
  },
  reviews: {
    type: Number,
    default: 0
  },
  kilometers: {
    type: Number,
    required: true
  },
  reservationsList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation',
    default: []
  }],
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    default: 'Montreal'
  }

})

module.exports = mongoose.model('Vehicle', VehicleSchema)
