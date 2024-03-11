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
    await User.deleteMany({});
    await Vehicle.deleteMany({}) 
    await mongoose.connection.close();
})
afterAll(async () => {
    // Drop the database after all tests
    //await mongoose.connection.dropDatabase();
    // Then close the connection
    await mongoose.connection.close();
});

//Add Users for tests requiring a user model
const signup = async () => {
    const user = await (request(app).post("/users/signup")).send({
        email: "test@gmail.com",
        firstName: "test",
        lastName: "Lahey",
        password: "TestingTesting123!"
    })
    return user;
}

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

    }));
    return [response, response2];
}
    
describe('GET /vehicles/getCarIdFromPhoto', () => {
    it('Should return a car model ID from the photo URL', async () => {
        await signup();
        await addVehicle();
        photoUrlToChange ='https://example.com/ford_mustang.jpg';
        const response = await request(app).get(`/vehicles/getCarIdFromPhoto?photoUrl=${encodeURIComponent(photoUrlToChange)}`)
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Found vehicle');
        expect(response.body.id).toBeDefined();
    });
 })

 const getId = async() =>{
    photoUrlToChange ='https://example.com/ford_mustang.jpg';
    const idResponse = await request(app).get(`/vehicles/getCarIdFromPhoto?photoUrl=${encodeURIComponent(photoUrlToChange)}`)
    return idResponse.body.id
}
    describe('Reservation Routes', () => {

        it('should reserve a vehicle', async () => {
            await signup();
            await addVehicle();
            const id = await getId();
            const response = await request(app).post('/vehicles/reserve').send({
                vehicleId: id,
                startDate: '2024-03-14',
                endDate: '2024-03-16',
                currentUser: "test@gmail.com",
                vehicleModifyId: id
            });
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Reservation sucessfull');
           
        });
     })


   it('should get reservations for a specific user', async () => {
        await signup();
        await addVehicle();
       const currentUser = 'test@gmail.com';
       const response = await request(app).get(`/vehicles/getReservation?currentUser=${currentUser}`);
       expect(response.statusCode).toBe(200);
       expect(response.body.message).toBe('Found reservations');
       expect(response.body.reservations).toBeDefined();
   });


describe('GET /vehicles/getAllUserReservations', () => {

   it('should get all user reservations', async () => {
    await signup();
    await addVehicle();
       const response = await request(app).get('/vehicles/getAllUserReservations');
       expect(response.statusCode).toBe(200);
       expect(response.body.message).toBe('Found users');
       expect(response.body.reservations).toBeDefined();
   });
})

describe('Reservation Routes', () => {

   it('should delete a reservation', async () => {
    await signup();
    await addVehicle();
       const currentUser = 'test@gmail.com';
       const response = await request(app).get(`/vehicles/deleteReservation?currentUser=${currentUser}`);
       expect(response.statusCode).toBe(200);
       expect(response.body.message).toBe('deleted reservation');
   });
})

describe('Reservation Routes', () => {

   it('should modify a reservation as an admin', async () => {
    await signup();
    await addVehicle();
       const adminData = {
           email: 'test@gmail.com',
           startDate: '2024-03-15',
           endDate: '2024-03-17'
       };


       const response = await request(app)
           .post('/vehicles/AdminModifyReservation')
           .send(adminData);


       expect(response.statusCode).toBe(200);
       expect(response.body.message).toBe('Reservation updated successfully');
       expect(response.body.updatedUser).toBeDefined();
   });
})

describe('Reservation Routes', () => {
    it('should delete a reservation as an admin', async () => {
        await signup();
        await addVehicle();
        const response = await request(app).post('/vehicles/AdminDeleteReservation').send({
            deleteEmail: 'test@gmail.com'
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Successfully Deleted');
    });
});


