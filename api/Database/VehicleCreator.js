const Vehicle = require('../models/Vehicle')

async function createVehicles () {
  try {
    const vehicles = [
      {
        brand: 'Chevrolet',
        model: 'Tahoe',
        VIN: '34567890123456789',
        photoURL: 'https://example.com/chevrolet_tahoe.jpg',
        plate: 'GHI789',
        year: 2020,
        color: 'Black',
        transmission: true,
        pricePerDay: 90,
        numberOfSeats: 8,
        numberOfDoors: 4,
        style: 'SUV',
        lister: 'Bob Johnson',
        kilometers: 30000
      },
      {
        brand: 'Ford',
        model: 'Mustang',
        VIN: '12345678901234567',
        photoURL: 'https://example.com/ford_mustang.jpg',
        plate: 'DEF123',
        year: 2023,
        color: 'Red',
        transmission: true,
        pricePerDay: 80,
        numberOfSeats: 4,
        numberOfDoors: 2,
        style: 'convertable',
        lister: 'Emily Davis',
        kilometers: 15000
      }
      // Add other vehicles following the same pattern...
    ]

    for (const vehicleData of vehicles) {
      const vehicle = new Vehicle(vehicleData)
      await vehicle.save()
    }

    console.log('Vehicles created successfully.')
  } catch (error) {
    console.error('Error creating vehicles:', error)
  }
}

module.exports = createVehicles
