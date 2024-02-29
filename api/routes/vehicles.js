var express = require('express');
var router = express.Router();
var Vehicle = require('../models/Vehicle');
var mongo = require('mongodb');
var assert = require('assert');

router.get('/getCars', function(req, res, next){

    Vehicle.find({}, (err, data) => {
        if(err){
            console.log("error occurred in route: /get-data", err);
        } else {
            // Send JSON response with fetched data
            res.json(data);
        }
    });
});

router.post('/insert', function(req, res, next){

});

router.post('/update', function(req, res, next){

});

router.post('/delete', function(req, res, next){

});

module.exports = router;
