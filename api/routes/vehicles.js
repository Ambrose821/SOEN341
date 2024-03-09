var express = require('express');
var router = express.Router();
var Vehicle = require('../models/Vehicle');
var mongo = require('mongodb');
var assert = require('assert');
var { addCar, deleteCar } = require('../controller/vehicleController');
const { isValidObjectId } = require('mongoose');
var User = require('../models/User');

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

router.post('/reserve',async function(req,res,next){
    try{

        const {vehicleId, startDate,endDate, currentUser}= req.body;

        const car = await Vehicle.findOne({_id: vehicleId}).lean();
        const photoUrl = car.photoURL;
        if(!car){
            return res.status(404).json({message:"Vehicle Not Found"});
        }

        // creates new object of reservation 
        const reservationToAdd = {
            start:startDate,
            end: endDate
        };

        //updates the the rez in the DB
        await Vehicle.findOneAndUpdate(
            {_id: vehicleId},
            {$push : {reservation:reservationToAdd}},
            {new: true}
        );

        const NewRez = {
            start:startDate,
            end:endDate,
            photo:photoUrl
        }

        await User.findOneAndUpdate(
            {email: currentUser},
            {$push : {reservations: NewRez }},
            {new: true}
        );

        res.status(200).json({message: 'Reservation sucessfull'});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "An error occured"});
    }
});


router.get('/getCarPhoto', async function(req, res, next){
    const vehicleID = req.query.id;
    
    const car = await Vehicle.findOne({_id:vehicleID }).lean();

    const PhotoUrl = car.photoURL;

    res.status(200).json({message: "Found Photo",photoURL: PhotoUrl});
});

router.get('/getReservation',async function(req,res,next){
    try{
        const currentUser = req.query.currentUser;

        const user = await User.findOne({email:currentUser});
    
        if(!user){
            res.status(404).json({message : "User not found"})
        }
    
        const reservationsFound = user.reservations;
    
        console.log(reservationsFound);
        res.status(200).json({message: "Found reservations", reservations: reservationsFound});
    }
    catch(error){
        res.status(500).json({message: "Something horrible happened"});
    }
    
});

// isAdmin
router.post('/insert', addCar,function(req, res, next){
    
});

router.post('/update', function(req, res, next){

});

router.delete('/delete', deleteCar, function(req, res, next){

});

module.exports = router;
