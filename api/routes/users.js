var express = require('express');
var router = express.Router();
var User = require('../models/User')
const crypto = require('crypto')
const passport = require('passport')
const jwt = require('jsonwebtoken')


const {login, refresh, logout} = require('../controller/authController')
const verifyJWT = require('../controller/verifyJWT')

//Too be moved to a middlewre or controller folder
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

/*Signup Route*/
router.post('/signup', async function(req, res, next) {
  var salt = crypto.randomBytes(16).toString('hex');
  

  //make sure unique emails are used
if(await User.findOne({email: req.body.email})){
res.status(400).json({success:false,message:"Email already in use"})
}

  crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async (err,hashedPasswordBuffer) =>{
      var hashedPassword = hashedPasswordBuffer.toString('hex'); //Convert Hashed Passwor to a hex string
      if(err){
        return(next(err))
      }
      //Create User Object

      var newUser = new User({
        firstName: req.body.firstName,
        last_name : req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        salt: salt
      })
      try{
      await newUser.save()
        res.status(201).json({success: true,message: "Account Created"})

      }catch(err){

        res.status(400).json({success: false, message: 'Signup Failed', error: err.message})

      }
    
      
    });
});


//Verify Token in all user routes



//Handle login

/*TOKENS ARE NOT STORED IN LOCAL STORAGE OR COOKIES.

If a token is stored somewhere with javascript, it can be accessed by an attacker

Refresh tokens are sent as a httpOnly cookie, not Accessible via Javascript, Must have expirey at some point*/



router.post('/login',login,(req,res,next)=>{
  const {refreshTokens} = req.app.locals;
  console.log(refreshTokens)
});

router.post('/token',(req,res)=>{
  const {token} = req.body;
  if (!token) return res.sendStatus(401);
  if (!refreshTokens.includes(token)) return res.sendStatus(403);
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign({ UserInfo: { email: user.email, user_flag: "example_flag" } }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    res.json({ accessToken });
  });

})


//NOT USED 
router.get('/refresh',refresh,(req,res,next)=>{

});

/*
router.delete('/logout',logout,(req,res,next) =>{

}); */

//not used
router.get('/users/me', authenticateToken, (req, res) => {
  // Return user info based on the provided access token
  res.json(req.user.UserInfo);
});

router.post("/adminRequest", async(req, res) => {

  try{
  const email = req.body.currentUser;
  const user = await User.findOne({email : email});
  user.user_flag = "admin";
  await user.save();

  const accessToken = jwt.sign(
    {
        "UserInfo" :{
            "user": {"email": user.email, "firstName": user.firstName, 
            'lastName' : user.last_name , 'user_flag': user.user_flag }
        }
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: '10m'}//Temp expirey for testing
)

const refreshToken = jwt.sign(
   {"username": user.email,
},
process.env.REFRESH_TOKEN_SECRET,
{expiresIn: '1d'} //Users wont need to re enter login for 24h
)

  res.status(200).json({success: true, message: "Admin Request Granted", accessToken: accessToken, refreshToken: refreshToken});
  }catch(err){
    res.status(400).json({success: false, message: err});
  }
});


router.post("/changeUserInfo", async (req, res) => {
  const { userEmail, newFirstName = null, newLastName = null,  newPassword = null, newEmail = null } = req.body;
  const user = await User.findOne({ email: userEmail });

  try {

    //make sure user password is correct
    //const user = await User.findOne({ email: userEmail });
    /* TEMPORARILY REMOVED FOR SIMPLICITY
    const storedPasswordBuffer = Buffer.from(user.password, 'hex'); 
    const isCorrectPassowrd = crypto.pbkdf2Sync(password,user.salt,310000,32,'sha256');    
    if(!crypto.timingSafeEqual(storedPasswordBuffer,isCorrectPassowrd)){
        return res.status(401).json({success:false, message: 'Incorrect Email or Password'})
    }*/  

   
    if (newFirstName) {
      console.log(`Updating firstName for user ${userEmail} to ${newFirstName}`);
      user.firstName = newFirstName;
      await user.save();
      console.log(`firstName updated successfully.`);
    }
    else if (newPassword) {
      console.log(`Updating password for user ${userEmail}`);
      crypto.pbkdf2(newPassword, user.salt, 310000, 32, 'sha256', async (err, hashedPasswordBuffer) => {
        if(err){
          console.error(err);
          return next(err); // Make sure 'next' is defined or use another way to handle the error.
        }
        user.password = hashedPasswordBuffer.toString('hex');
        await user.save();
        console.log(`Password updated successfully.`);
      });
    }
    else if (newEmail) {
      console.log(`Updating email for user ${userEmail} to ${newEmail}`);
      user.email = newEmail;
      await user.save();
      console.log(`Email updated successfully.`);
    }
    else if (newLastName) {
      console.log(`Updating last_name for user ${userEmail} to ${newLastName}`);
      user.last_name = newLastName; // Ensure this matches the schema
      await user.save();
      console.log(`last_name updated successfully.`);
    }

    //Assign new token/////////////////////

    const accessToken = jwt.sign(
      {
          "UserInfo" :{
              "user": {"email": user.email, "firstName": user.firstName, 
              'lastName' : user.last_name , 'user_flag': user.user_flag }
          }
      },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: '10m'}//Temp expirey for testing
  )
  
    const refreshToken = jwt.sign(
      {"username": user.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: '1d'} //Users wont need to re enter login for 24h
    )
    console.log('about to send res status')
    res.status(200).json({success:true, message: "Account Changes Made", accessToken: accessToken, refreshToken: refreshToken});

      
    //////////////////////////////
    
  } catch (err) {
    res.status(400).json({ success: false, message: "Could not change value. Server error: " + err })
    console.log(err)
  }

})

router.delete('/deleteUser', async(req, res) => {
  const { currentUser } = req.body;

  try {
    const userToDelete = await User.findOne({ email: currentUser });

    result = await User.deleteOne({email: currentUser} );
    res.status(200).json({ success: true, message: 'UserDeleted' })
  } catch (err) {
    res.status(400).json({success:false, message: 'lol Couldnt Delete.' +err })
  }
})

module.exports = router;
