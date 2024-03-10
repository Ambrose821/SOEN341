const mongoose = require("mongoose");
const request = require("supertest");
const User = require('../models/User')

const app = require('../app')

require('dotenv').config();
//connect to mongo before each unit test (make a new mongo uri for this)
beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URI)
})
//disconnect from mongo before each unit test
afterEach(async () => {
    await User.deleteOne({firstName:"test"});
    await mongoose.connection.close();
})

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

        expect(response.statusCode).toBe(201)

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

        expect(app.response.statusCode).toBe(200)

        
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

        expect(app.response.statusCode).toBe(200)
    })
})

//User flag modified to Admin from customer
describe("POST /users/adminRequest", () => {
    it("Should changes a users flag to admin from customer, or remain admin if already admin",
        async () => {
            const user = await signup()
            
            const response = await (request(app).post("/user/adminRequest").send({
                userEmail: "test@gmail.com"
            }))
            expect(app.response.statusCode).toBe(200)
    })
})

//Delete a user
describe("DELETE /users/deleteUser", () => {
    it("Should delete a user from the database", async () => {
        const user = await signup()

        const response = await (request(app).post("/user/deletUser").send({
            currentUser: "test@gmail.com"
        }))

        expect(app.response.statusCode).toBe(200)
    })
})