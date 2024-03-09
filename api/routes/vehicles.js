var express = require('express');
var router = express.Router();
var Vehicle = require('../models/Vehicle');
var mongo = require('mongodb');
var assert = require('assert');
var { addCar, deleteCar } = require('../controller/vehicleController')

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

// isAdmin
router.post('/insert', addCar,function(req, res, next){
    
});

router.post('/update', function(req, res, next){

});

router.delete('/delete', deleteCar, function(req, res, next){

});

module.exports = router;
