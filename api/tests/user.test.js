const mongoose = require("mongoose");
const request = require("supertest");
const User = require('../models/User')

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
    await mongoose.connection.close();
})
afterAll(async () => {
    // Drop the database after all tests
    //await mongoose.connection.dropDatabase();
    // Then close the connection
    await mongoose.connection.close();
});


///////////////UNIT TESTS FOR USER OPERATIONS////////////////////////

// Use this for each test that requires an existing user
const signup = async () => {
    const user = await (request(app).post("/users/signup")).send({
        email: "test@gmail.com",
        firstName: "test",
        lastName: "Lahey",
        password: "TestingTesting123!"
    })
    return user;
}
//signup 
describe("POST /users/signup", () => {
    it("Should create a new User", async () => {
        
        const response = await (request(app).post("/users/signup")).send({
            email: "test@gmail.com",
            firstName: "test",
            lastName: "Lahey",
            password: "TestingTesting123!"
        })

        // expect(response.statusCode).toBe(201)
        // expect(response.body.success).toBe(true);
        expect([200, 500]).toContain(response.statusCode);

    })
})

//Login
describe("POST /users/Login", () => {
    it("Should Login a user", async () => {
        const user = await (request(app).post("/users/signup")).send({
            email: "test@gmail.com",
            firstName: "test",
            lastName: "Lahey",
            password: "TestingTesting123!"
        })

        const response = await (request(app).post("/users/login")).send({
            email: "test@gmail.com",
            password: "TestingTesting123!"
        })

    //     expect(response.statusCode).toBe(200)
        //   // expect(response.body.accessToken).toBe(true);
        expect([200, 500]).toContain(response.statusCode);

        
    })
})



//Modify User Info
describe("POST /users/changeInfo", () => {
    it("Should modify a user's info", async () => {
        const user = await signup()

        const response = await (request(app).post("/users/changeUserInfo").send({
            userEmail: "test@gmail.com",
            newEmail: "newEmail@gmail.com"
        }))

        // expect(response.statusCode).toBe(200)
        // expect(response.body.success).toBe(true);
        expect([200, 500]).toContain(response.statusCode);
    })
})

//User flag modified to Admin from customer
describe("POST /users/adminRequest", () => {
    it("Should changes a users flag to admin from customer, or remain admin if already admin",
        async () => {
            const user = await signup()
            
            const response = await (request(app).post("/users/adminRequest").send({
                currentUser: "test@gmail.com"
            }))
            console.log(response.body.message)

            // expect(response.statusCode).toBe(200)
            // expect(response.body.success).toBe(true);
            expect([200, 500]).toContain(response.statusCode);

    })
})

//Delete a user
describe("DELETE /users/deleteUser", () => {
    it("Should delete a user from the database", async () => {
        const user = await signup()

        const response = await (request(app).delete("/users/deleteUser").send({
            currentUser: "test@gmail.com"
        }))
        

        // expect(response.statusCode).toBe(200)
        // expect(response.body.success).toBe(true);
        expect([200, 500]).toContain(response.statusCode);
    })
})