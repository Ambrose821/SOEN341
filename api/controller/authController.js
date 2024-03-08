const User = require('../models/User');
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
//@desc Login
//@route POST/user/login
//@access Public
const login =  async (req,res,next)=>{
    const {email, password} = req.body

    if(!email || !password){
        return res.status(401).json({success: false, message:"Please do not leave fields empty"})
    }
    const thisUser = await User.findOne({email: email})

    if(!thisUser){
        return res.status(401).json({success: false, message: 'No User Found.'})
    }
    const storedPasswordBuffer = Buffer.from(thisUser.password, 'hex'); 
    const isCorrectPassowrd = crypto.pbkdf2Sync(password,thisUser.salt,310000,32,'sha256');    
    if(!crypto.timingSafeEqual(storedPasswordBuffer,isCorrectPassowrd)){
        return res.status(401).json({success:false, message: 'Incorrect Email or Password'})
    }

    //Access token
    const accessToken = jwt.sign(
        {
            "UserInfo" :{
                "user": {"email": thisUser.email, "firstName": thisUser.firstName, 
                'lastName' :thisUser.last_name , 'user_flag': thisUser.user_flag }
               /* "firstName": thisUser.firstName,
                "lastName": thisUser.last_name,
                "user_flag:" : thisUser.user_flag*/
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '10m'}//Temp expirey for testing
    )

    const refreshToken = jwt.sign(
       {"username": thisUser.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: '1d'} //Users wont need to re enter login for 24h
    )
    const {refreshTokens} = req.app.locals
    //refreshTokens.push(refreshToken);
    console.log(refreshTokens)
    res.json({accessToken,refreshToken})

   
}


//@desc Refresh
//@route GET/user/refreshx
//@access Public
const refresh = (req,res) =>{
    const cookies = req.cookies

    if(!cookies?.jwt){
        return res.status(401).json({success:false,message:"Unauthorized at no cookie found in jwt"})
    }
    const refreshToken = cookies.jwt

    jwt.verify(refreshToken,
        process.env.REFRESH_TOKEN_SECRET, async(err,decoded) =>{
            if(err){
                return res.status(403).json({success : false, message :'Forbidden'})
            }
            const thisUser = await User.findOne({email: decoded.email});

            if(!thisUser) return res.status(401).json({success: false,message: "Unauthorized failed at jwt.verify "})
            
            const accessToken = jwt.sign(
                {
                    "UserInfo" :{
                        "user": {email: thisUser.email, firstName: thisUser.firstName, lastName :thisUser.last_name , user_flag: thisUser.user_flag }
                       /* "firstName": thisUser.firstName,
                        "lastName": thisUser.last_name,
                        "user_flag:" : thisUser.user_flag*/
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '10m'}//Temp expirey for testing
                
            )
            res.json({accessToken: accessToken})
       
        })
}

//@desc Logout
//@route POST/user/logout
//@access Public - clear cookie if it exists
const logout =  (req,res,next) =>{
  var {refreshTokens} = req.app.locals;
  console.log(req.body.token)
  refreshTokens = refreshTokens.filter(token => token !==req.body.token)
  console.log(refreshTokens)
  res.sendStatus(204)
 
  
}

// checks if the user is an admin
const isAdmin = async (req, res, next) => {
    try {
        const userEmail = req.body.email;
        const user = await User.findOne({ email: userEmail });

        if (!user || user.user_flag !== 'admin') {
            return res.status(403).json({ success: false, message: 'Access denied: You are not authorized to perform this action' });
        }
        next();
    } catch (error) {
        console.error('Error in isAdmin middleware:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = {login,refresh,logout, isAdmin}


