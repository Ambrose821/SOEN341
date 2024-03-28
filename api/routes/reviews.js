var express = require('express');
var router = express.Router();
var Vehicle = require('../models/Vehicle');
var mongo = require('mongodb');
var assert = require('assert');
const { isValidObjectId } = require('mongoose');
var User = require('../models/User');
var { addCar, deleteCar, updateCar, find_nearest } = require('../controller/vehicleController')
const Reservation = require('../models/Reservation');
const Review = require('../models/CarReview');
var router = express.Router();

router.post('/uploadReview' , async function(req,res,next){

    try{
        const {newRating, newComment,newEmail,vehicleId} = req.body;

        const review = {
            stars : newRating,
            comment : newComment,
            email : newEmail,
            vehicleId:vehicleId
        };
    
        const newReview = new Review(review);
        await newReview.save();
        res.status(200).json({message:"sucessfully added review"});
    
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Failed in try catch"});
    }
});

router.post('/getReviewsByCarId' , async function(req,res,next){

    try{
        const {vehicleId} = req.body;
        const reviews = await Review.find({vehicleId:vehicleId}).lean();
        res.status(200).json({message:"sucessfully added review",reviews:reviews});
    
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Failed in try catch"});
    }
});

module.exports = router;