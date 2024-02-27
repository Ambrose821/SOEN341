var express = require('express');
var router = express.Router();
var User = require('../models/User')
const crypto = require('crypto')
const passport = require('passport')


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
router.get('/refresh',refresh,(req,res,next)=>{

});

router.delete('/logout',logout,(req,res,next) =>{

}); 

router.get('/users/me', authenticateToken, (req, res) => {
  // Return user info based on the provided access token
  res.json(req.user.UserInfo);
});
module.exports = router;
