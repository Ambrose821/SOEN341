const mongoose = require("mongoose");
const request = require("supertest");
const User = require('../models/User')
const Vehicle = require('../models/Vehicle')
const app = require('../app')

require('dotenv').config();
//connect to mongo before each unit test (make a new mongo uri for this)
beforeEach(async () => {
    if (mongoose.connection.readyState === 0) {
        // No active connection
        await mongoose.connect(process.env.MONGO_TEST_URI);
    } else {
        // There is an active connection
        await mongoose.connection.close(); // Close the active connection
        await mongoose.connect(process.env.MONGO_TEST_URI); // Connect to the new URI
    }
});
//disconnect from mongo before each unit test
afterEach(async () => {
    await Vehicle.deleteMany({lister:'Hasbulla'}) 
    await mongoose.connection.close();
})



//Create vehicle and add to
describe("POST /vehicles/insert", () => {
    it("Should get create a car object and insert it into the database", async () => {
        const response = await (request(app).post("/vehicles/insert").send({brand: 'Ford',
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
        lister: 'Hasbulla',
        kilometers: 15000

        }))

        expect(response.statusCode).toBe(201)
        expect(response.body.success).toBe(true);
    })
})


//for tests that require vehicles in the database
const addVehicle = async () => {
    const response = await (request(app).post("/vehicles/insert").send({brand: 'Ford',
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
    lister: 'Hasbulla',
    kilometers: 15000

    }))

    const response2 = await (request(app).post("/vehicles/insert").send({brand: 'Ford',
    model: 'Lambo',
    VIN: '123456701234567',
    photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/2017_Lamborghini_Huracan_LP610.jpg/420px-2017_Lamborghini_Huracan_LP610.jpg',
    plate: 'LAMB123',
    year: 2024,
    color: 'Red',
    transmission: true,
    pricePerDay: 180,
    numberOfSeats: 4,
    numberOfDoors: 2,
    style: 'convertable',
    lister: 'Hasbulla',
    kilometers: 1500

    }))
}

//get vehicles from database
describe("GET /vehicles/getCars", () => {
    it("Should get all cars from database for display, reservations, etc.", async () => {

        await addVehicle()
        const response = await (request(app).get("/vehicles/getCars"))

        expect(response.statusCode).toBe(200)
       // expect(response.body.success).toBe(true);
        
    })
})

describe("PUT /vehicles/update", () => {
    it("Should update the fields of an existing car object ", async () => {
        await addVehicle()

        const updatedVehicle = {brand: 'Ford',
            model: 'Mustang',
              
        VIN: '12345678901234567',
        photoURL: 'https://example.com/ford_mustang.jpg',
        plate: 'DEF123',
        year: 2023,
        color: 'Green',
        transmission: true,
        pricePerDay: 250,
        numberOfSeats: 4,
        numberOfDoors: 2,
        style: 'convertable',
        lister: 'Hasbulla',
        kilometers: 15200
    
        }
        
        
        
        const response = await (request(app).put("/vehicles/update").send({
           VIN: '12345678901234567', updatedVehicle
        }))

        expect(response.statusCode).toBe(200)
        expect(response.body.success).toBe(true);
    })
})

//deletCar

describe("DELETE /vehicles/delete", () => {
    it("Should delete Cars from DB", async () => {
        await addVehicle();

        const response = await (request(app).delete("/vehicles/delete").send({
            deleteVIN: '123456701234567'
        }))
        expect(response.statusCode).toBe(200)
        expect(response.body.success).toBe(true);
    })
    
})


