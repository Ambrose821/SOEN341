const mongoose = require('mongoose')

const ReservationShchema = new mongoose.Schema({

  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  carCost: {
    type: Number,
    required: true
  },
  gps: {
    type: Boolean,
    required: true,
    default: false
  },
  insurance: {
    type: Boolean,
    required: true,
    default: false
  },
  deposit: {
    type: String,
    default: 'due',
    enum: ['due', 'paid', 'refunded']
  },
  pickUp: {
    type: String,
    default: 'Montreal'
  },
  dropOff: {
    type: String,
    default: 'Montreal'
  },
  checkedIn: {
    type: Boolean,
    default: false
  }

})

module.exports = mongoose.model('Reservation', ReservationShchema)
