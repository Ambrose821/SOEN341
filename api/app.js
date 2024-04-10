const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const session = require("express-session");
const methodOverride = require("method-override");

// Models
const User = require("./models/User");
const Vehicle = require("./models/Vehicle");

// routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const apiRouter = require("./routes/apiRouter");
const vehicleRouter = require("./routes/vehicles");
const stripeRouter = require("./routes/stripe-route");
const reviewRouter = require("./routes/reviews");

const app = express();
app.use(cors());

// Passport config
const passport = require("passport");
require("./config/passport")(passport);

// Load config file
dotenv.config({ path: "./config/config.env" });

// Mongo Middleware
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");
const { refresh } = require("./controller/authController");
connectDB();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

// passport middleware

app.use(passport.initialize());
app.use(passport.session());

// RefreshTokens

const refreshTokens = [];
app.locals.refreshTokens = refreshTokens;

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/apiRoute", apiRouter);
app.use("/vehicles", vehicleRouter);
reviewRouter;
app.use("/stripe-route", stripeRouter);
app.use("/reviews", reviewRouter);

// Add branches. Please dont uncomment
// const createBranches = require('./Database/BranchCreator')
// createBranches();

// middle ware for methodOverride so use of PUT and DELETE is possible
// from method-Overide docs
app.use(
  methodOverride((req, res) => {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST  bodies and delete it
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

module.exports = app;
