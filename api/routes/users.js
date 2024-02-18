var express = require('express');
var router = express.Router();
var User = require('../models/User')
/* GET users listing. */
router.post('/signup', function(req, res, next) {
  var salt = crypto.randomBytes(16).toString('hex');
  crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async (err,hashedPasswordBuffer) =>{
      var hashedPassword = hashedPasswordBuffer.toString('hex'); //Convert Hashed Passwor to a hex string
      if(err){
        return(next(err))
      }
      //Create User Object

      var newUser = new User({
        firstName: req.body.firstName,
        last_name : req.body.last_name,
        email: req.body.email,
        password: hashedPassword,
      })

      await newUser.save((err, user) =>{
        if (err){
          res.status(400).json({success: false, message: 'Signup Failed', error: err.message});
        }
        else{
          res.status(201).json({success: true, message: 'User Created'})
        }
      })
    });
});

module.exports = router;
