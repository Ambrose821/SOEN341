var express = require('express');
var router = express.Router();
var Vehicle = require('../models/Vehicle');
var mongo = require('mongodb');
var assert = require('assert');


router.get('/getCars', async function(req, res, next){

    try{
        const cars = await Vehicle.find({}).lean();

        res.status(200).json(cars);
    }
    catch(error){
        console.log(error);
        res.status(400).json({sucess:false,message: "Get vehicles Failed" + error})
    }
});

router.post('/reserve', async function(req, res, next) {
    const { photoUrl, startDate, endDate, currentUser } = req.body; 
     console.log(photoUrl, startDate, endDate, currentUser);

    try {
        console.log(photoUrl,startDate,endDate,currentUser)
        res.status(200).json({ success: true, message: "Reservation successfully created" });
    } catch(error) {
        console.error(error);
        res.status(400).json({ success: false, message: "Reservation creation failed: " + error });
    }
});
module.exports = router;
