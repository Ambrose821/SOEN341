const express = require('express')
const Vehicle = require('../models/Vehicle')
const User = require('../models/User')
const Reservation = require('../models/Reservation')

async function reserve (req, res, next) {
  try {
    const { vehicleId, startDate, endDate, currentUser, gps, insurance, pickUp, dropOff, deposit, imageUrl } = req.body

    console.log(vehicleId)
    console.log(startDate)
    console.log(endDate)
    console.log(currentUser)
    console.log(gps)
    console.log(insurance)

    const v = await Vehicle.findOne({ _id: vehicleId })
    vehicle = JSON.stringify(v, null, 2)

    const user = await User.findOne({ email: currentUser })

    console.log(v.pricePerDay)

    const reservationData = {
      startDate,
      endDate,
      vehicle: v._id,
      user: user._id,
      carCost: v.pricePerDay,
      insurance,
      gps,
      deposit,
      pickUp,
      dropOff,
      dropOff
    }

    const reservation = new Reservation(reservationData)
    reservation.save()

    res.status(200).json({ message: 'Sucess' })
    next()
  } catch (error) {
    console.log('ERROR OCCURED')
    console.log(error)
    next(error)
  }
}

module.exports = reserve
