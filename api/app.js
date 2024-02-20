var dotenv = require("dotenv")
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var session = require('express-session')

//Models
const User = require('./models/User');
const Vehicle = require('./models/Vehicle');


//routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/apiRouter');

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

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/apiRoute',apiRouter)

module.exports = app;
