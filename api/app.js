var dotenv = require("dotenv")
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var session = require('express-session')
var methodOverride = require("method-override");

//Models
const User = require('./models/User');
const Vehicle = require('./models/Vehicle');



//routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/apiRouter');
var vehicleRouter = require('./routes/vehicles');

var app = express();
app.use(cors());

//Passport config
var passport = require('passport')
require('./config/passport')(passport)


//Load config file
dotenv.config({path: './config/config.env'})


//Mongo Middleware
const mongoose = require('mongoose');
const MongoStore = require("connect-mongo")
const connectDB = require('./config/db');
const { refresh } = require("./controller/authController");
connectDB();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI})
  }));

//passport middleware 

app.use(passport.initialize())
app.use(passport.session())

//RefreshTokens

var refreshTokens = []
app.locals.refreshTokens = refreshTokens

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/apiRoute',apiRouter)
app.use('/vehicles',vehicleRouter);

// Creating Objects in Database 
const createVehicles = require('./Database/VehicleCreator');
// Commented out since it would create vehicles everytime someone runs the server!
// createVehicles(); 

//middle ware for methodOverride so use of PUT and DELETE is possible
//from method-Overide docs
app.use(methodOverride((req,res)=>{
  if(req.body && typeof req.body === 'object' && '_method' in req.body){
      //look in urlencoded POST  bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
  }
}))


module.exports = app;

