const Vehicle = require('../models/Vehicle')
const Branch = require('../models/Branch')
const axios = require('axios')

const addCar = async (req, res, next) => {
  try {
    const {
      brand,
      model,
      VIN,
      photoURL,
      plate,
      year,
      color,
      transmission,
      pricePerDay,
      numberOfSeats,
      numberOfDoors,
      style,
      reservation,
      lister,
      kilometers,
      branch
    } = req.body

    const carBranch = await Branch.findOne({ BranchName: branch })

    const car = new Vehicle({
      brand,
      model,
      VIN,
      photoURL,
      plate,
      year,
      color,
      transmission,
      pricePerDay,
      numberOfSeats,
      numberOfDoors,
      style,
      reservation,
      lister,
      kilometers,
      branch: carBranch._id
    })
    await car.save()
    res.status(201).json({ success: true, message: 'Car Added Succesfully' })
    next()
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

const deleteCar = async (req, res, next) => {
  const { deleteVIN } = req.body

  try {
    console.log(deleteVIN)
    const vinToDelete = await Vehicle.findOneAndDelete({ VIN: deleteVIN }).lean()
    console.log(vinToDelete)

    if (!vinToDelete) {
      return res.status(404).json({ success: false, message: 'No car found with the provided VIN' })
    }
    // vinToDelete = await Vehicle.deleteOne(vinToDelete);
    res.status(200).json({ success: true, message: 'Car deleted' })

    // next();
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
    next(error)
  }
}

const updateCar = async (req, res, next) => {
  // const { VIN, ...updatedData } = req.body;

  try {
    const { VIN, ...updatedData } = req.body
    const existingCar = await Vehicle.findOne({ VIN })
    if (!existingCar) {
      return res.status(404).json({ success: false, message: 'No car found with the provided VIN' })
    }

    if (updatedData.brand) {
      existingCar.brand = updatedData.brand
    }
    if (updatedData.model) {
      existingCar.model = updatedData.model
    }
    if (updatedData.year) {
      existingCar.year = updatedData.year
    }
    if (updatedData.color) {
      existingCar.color = updatedData.color
    }
    if (updatedData.color) {
      existingCar.pricePerDay = updatedData.pricePerDay
    }
    if (updatedData.branch) {
      existingCar.branch = updatedData.branch
    }

    const updatedCar = await existingCar.save()

    res.status(200).json({ success: true, message: 'Car updated successfully', car: updatedCar })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

const get_postal_code_coords = async (postalCode) => {
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&postalcode=${postalCode}&limit=1&countrycodes=ca,us`)
    const data = response.data
    if (data && data.length > 0) {
      var coords = {
        longitude: parseFloat(data[0].lon),
        latitude: parseFloat(data[0].lat),
        message: 'No need for default'
      }
    } else {
      var coords = {
        longitude: parseFloat(data[0].lon),
        latitude: parseFloat(data[0].lat),
        message: 'Error With Finding postal code. Defaulting to Main branch in Montreal',
        error: true
      }
    }
    return (coords)
  } catch (err) {
    console.error('postal code => coords err ' + err)
    return ('Use Default')
  }
}
const find_nearest = async (req, res, next) => {
  const postal_code = req.query.postalCode

  const coordsJson = await get_postal_code_coords(postal_code)
  if (coordsJson == 'Use Default') {
    return res.status(500).json({ success: false, message: 'Default', branch: 'Default' })
  }
  console.log(coordsJson.message)
  const longitude = coordsJson.longitude
  const latitude = coordsJson.latitude
  console.log('lon ' + longitude + 'lat ' + latitude)

  // const latitude = 43//temp
  // const longitude =79//temp
  // mechanism to find closest branch assuming you can access coordinates
  try {
    const nearest_branch = await Branch.findOne({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          }
        }
      }
    })

    const branch_name = nearest_branch.BranchName
    res.status(200).json({ success: true, message: `Nearest Branch is in ${branch_name}`, branch: nearest_branch })
  } catch (err) {
    console.error('Error finding nearest branch' + err)
    res.status(404).json({ success: false, message: 'Default', branch: 'Default' })
    next(err)
  }
}

module.exports = { addCar, deleteCar, updateCar, find_nearest }
