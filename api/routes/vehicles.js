var express = require('express');
var router = express.Router();
var Vehicle = require('../models/Vehicle');
var mongo = require('mongodb');
var assert = require('assert');
const { isValidObjectId } = require('mongoose');
var User = require('../models/User');
var { addCar, deleteCar, updateCar } = require('../controller/vehicleController')

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

        console.log("0");
        const {vehicleId, startDate,endDate, currentUser,vehicleModifyId}= req.body;
        console.log("1");
        console.log(vehicleId+ " " + startDate +" " + currentUser+ " " + vehicleModifyId);
        let id;


        if(vehicleModifyId){
            console.log("2");
            id = vehicleModifyId;
        }
        else{
            console.log("3");
            id = vehicleId;
        }

        console.log(id);

        console.log("4");
        const car = await Vehicle.findOne({_id: id}).lean();

        console.log("5");
        console.log(car);

        console.log(0);
        const photoUrl = car.photoURL;
        console.log(1);
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
            {_id: id},
            {$set : {reservation:reservationToAdd}},
            {new: true}
        );

        const NewRez = {
            start:startDate,
            end:endDate,
            photo:photoUrl
        }

        await User.findOneAndUpdate(
            {email: currentUser},
            {$set : {reservations: NewRez }},
            {new: true}
        );

        res.status(200).json({message: 'Reservation sucessfull'});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "An error occured"});
    }
});

router.get('/getCarIdFromPhoto', async function(req, res, next){
    const photoUrl = req.query.photoUrl;

    try {
        const car = await Vehicle.findOne({ photoURL: photoUrl }).lean();
        if (car && car._id) {
            return res.status(200).json({ message: 'Found vehicle', id: car._id });
        } else {
            return res.status(404).json({ message: 'Could not find vehicle' });
        }
    } catch(error) {
        console.error('Server error:', error);
        return res.status(500).json({ message: 'Server error in processing request' });
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

router.get('/deleteReservation', async function(req,res,next){
    try{
        const currentUser = req.query.currentUser;

        await User.findOneAndUpdate(
            {email:currentUser},
            {$set: {reservations: []}},
            {new: true},
        )
            res.status(200).json({message : "deleted reservation"});
    }
    catch(error){
        res.status(500).json({message : "error in deleting reservation"})
    }
});


// isAdmin
router.post('/insert', addCar,function(req, res, next){
    
});

router.put('/update', updateCar, function(req, res, next){

});

router.delete('/delete', deleteCar, function(req, res, next){

});

module.exports = router;
