const express = require("express");
const router = express.Router();
const Vehicle = require("../models/Vehicle");
const CarReview = require("../models/CarReview");
const mongo = require("mongodb");
const assert = require("assert");
const { isValidObjectId } = require("mongoose");
const User = require("../models/User");
const {
  addCar,
  deleteCar,
  updateCar,
  find_nearest,
} = require("../controller/vehicleController");
const Reservation = require("../models/Reservation");
const sendConfirmEmail = require("../controller/mailerRouter");
const reserve = require("../controller/reservationController");


router.get("/getCars", async function (req, res, next) {
    try {
      // We want all cars, thats why we are using find({}), which will return all cars 
    const cars = await Vehicle.find({}).populate("branch").lean();

    res.status(200).json(cars);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ sucess: false, message: "Get vehicles Failed" + error });
  }
});
// We need to save reservations into the DB
router.post(
  "/reserve",
  reserve,
  sendConfirmEmail,
  async function (req, res, next) {}
);

router.get("/getCarIdFromPhoto", async function (req, res, next) {
  const photoUrl = req.query.photoUrl;

  try {
    const car = await Vehicle.findOne({ photoURL: photoUrl }).lean();
    if (car && car._id) {
      return res.status(200).json({ message: "Found vehicle", id: car._id });
    } else {
      return res.status(404).json({ message: "Could not find vehicle" });
    }
  } catch (error) {
    console.error("Server error:", error);
    return res
      .status(500)
      .json({ message: "Server error in processing request" });
  }
});

// Sometimes we can only send photo from ID to be querired so we need a route to do this  
router.get("/getCarPhoto", async function (req, res, next) {
  const vehicleID = req.query.id;

  const car = await Vehicle.findOne({ _id: vehicleID }).lean();

  const PhotoUrl = car.photoURL;

  res.status(200).json({ message: "Found Photo", photoURL: PhotoUrl });
});

// We need to get reservation because we need to see all reservations 
router.get("/getReservation", async function (req, res, next) {
  try {
    const currentUser = req.query.currentUser;

    const user = await User.findOne({ email: currentUser });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const reservationsFound = user.reservations;

    console.log(reservationsFound);
    res
      .status(200)
      .json({ message: "Found reservations", reservations: reservationsFound });
  } catch (error) {
    res.status(500).json({ message: "Something horrible happened" });
  }
});

router.get("/getCarCost", async function (req, res, next) {
  try {
    const vehicleID = req.query.id;

    const vehicle = await Vehicle.findById(vehicleID).lean();

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const carCost = vehicle.carCost;

    res
      .status(200)
      .json({ message: "Car cost retrieved successfully", carCost });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// We need to retreive vehicles by there ID because that is the property that can be sent 
router.get("/getVehicleByID", async function (req, res) {
  try {
    const vehicleId = req.query.vehicleID; // Corrected to vehicleID
    console.log(vehicleId);
    const vehicle = await Vehicle.findById({ _id: vehicleId }).lean(); // Corrected to vehicleId
    console.log(vehicle);
    if (!vehicle) {
      return res.status(404).json({ message: "There is no such Vehicle" });
    }

    res.status(200).json({ message: "The vehicle was found!", vehicle });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Something went wrong!" }); // Corrected typo
  }
});

router.get("/getAllUserReservations", async function (req, res, next) {
  try {
    const allUsersWithReservations = await User.find({
      reservations: { $exists: true, $ne: [] },
    }).lean();

    console.log(allUsersWithReservations);

    res
      .status(200)
      .json({ message: "Found users", reservations: allUsersWithReservations });
  } catch (error) {
    res.status(500).json({ message: "something went horribly wrong" });
  }
});

router.get("/getAllReservations", async function (req, res, next) {
  try {
    const allUsers = await User.find({}, "reservations").lean();
    const allReservations = allUsers.flatMap((user) => user.reservations);
    res.status(200).json({
      message: "All reservations retrieved",
      reservations: allReservations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving reservations" });
  }
});

router.get("/deleteReservation", async function (req, res, next) {
  try {
    const currentUser = req.query.currentUser;

    await User.findOneAndUpdate(
      { email: currentUser },
      { $set: { reservations: [] } },
      { new: true }
    );
    res.status(200).json({ message: "deleted reservation" });
  } catch (error) {
    res.status(500).json({ message: "error in deleting reservation" });
  }
});

router.post("/AdminModifyReservation", async function (req, res, next) {
  try {
    const { email, startDate, endDate } = req.body;

    // Updating the first reservation's start and end date for the user with the given email
    const updateResult = await User.findOneAndUpdate(
      { email }, // Find a user by email
      {
        $set: {
          // Update the start and end dates of the first reservation
          "reservations.0.start": startDate,
          "reservations.0.end": endDate,
        },
      },
      { new: true } // Return the updated document
    );

    if (updateResult) {
      res.status(200).json({
        message: "Reservation updated successfully",
        updatedUser: updateResult,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Something terrible happened" });
  }
});

router.post("/AdminDeleteReservation", async function (req, res, next) {
  const { deleteEmail } = req.body; // Correctly destructure to get deleteEmail from the body

  if (!deleteEmail) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const result = await User.findOneAndUpdate(
      { email: deleteEmail }, // Ensure this matches exactly with how emails are stored
      { $set: { reservations: [] } }, // Clears out the reservations array
      { new: true }
    );

    if (result) {
      console.log("Successfully Deleted");
      res.status(200).json({ message: "Successfully Deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/getUserReservations", async function (req, res, next) {
  try {
    const { currentUser } = req.body;
    console.log("emai" + currentUser);

    const user = await User.findOne({ email: currentUser });

    console.log("user " + JSON.stringify(user));

    const reservations = await Reservation.find({ user: user._id })
      .populate("vehicle")
      .populate("user") // Only populate 'photoURL' from 'vehicle'
      .lean();

    console.log("RESERVATION" + reservations);

    res.status(200).json({ message: "Success", reservations });
  } catch (error) {
    console.log(error);
    const reservations = [];
    res.status(500).json({ message: "Waiting for User", reservations });
  }
});

router.post("/deleteReservations", async function (req, res, next) {
  try {
    const { reservationID } = req.body;
    console.log("REZ: " + reservationID);
    await Reservation.findOneAndDelete({ _id: reservationID });

    res.status(200).json({ message: "Sucessfully deleted reservation" });
  } catch (error) {
    res.status(500).json({ message: "Something terrible happened error 500" });
  }
});

router.post("/modifyReservations", async function (req, res, next) {
  try {
    const {
      vehicleId,
      startDate,
      endDate,
      currentUser,
      gps,
      insurance,
      pickUp,
      dropOff,
    } = req.body;

    console.log("INFOOOOO: " + vehicleId, startDate, endDate, gps, insurance);

    await Reservation.findOneAndUpdate(
      { _id: vehicleId },
      {
        $set: {
          startDate,
          endDate,
          gps,
          insurance,
          pickUp,
          dropOff,
        },
      },
      { new: true }
    );

    res.status(200).json({ message: "Sucess" });
  } catch (error) {
    res.status(500).json({ message: "Failure" });
  }
});

router.post("/getReservationDates", async function (req, res) {
  console.log("I START HERE");
  try {
    let reservations;
    const { idToUse, isVehicle } = req.body;

    console.log("VALUE:" + isVehicle);

    if (isVehicle) {
      reservations = await Reservation.find({ vehicle: idToUse });
    } else {
      const temp = await Reservation.findOne({ _id: idToUse })
        .populate("vehicle")
        .lean();
      const id = temp.vehicle._id;
      reservations = await Reservation.find({ vehicle: id });
    }

    console.log(reservations);

    const reserveDates = [];

    reservations.forEach((reservation) => {
      const currentDate = new Date(reservation.startDate);

      while (currentDate <= reservation.endDate) {
        const formattedDate = currentDate.toISOString().split("T")[0];

        console.log(formattedDate);

        if (!reserveDates.includes(formattedDate)) {
          reserveDates.push(formattedDate);
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    res.status(200).json({ message: "Sucess", dates: reserveDates });
  } catch (error) {
    console.error("Error fetching reservation dates:", error);
    res.status(500).json({ message: "Error500" });
  }
});

// isAdmin
router.post("/insert", addCar, function (req, res, next) {});

router.put("/update", updateCar, function (req, res, next) {});

router.delete("/delete", deleteCar, function (req, res, next) {});

router.get("/nearest", find_nearest, (req, res) => {});

router.post("/update-deposit", async (req, res) => {
  try {
    const { reservationId, depositStatus } = req.body;
    console.log("Updating deposit for reservation ID:", reservationId);
    console.log("New deposit status:", depositStatus);

    const reservation = await Reservation.findOne(reservationId);

    if (reservation) {
      reservation.deposit = depositStatus;
      await reservation.save();
      res.json({
        success: true,
        message: "Deposit status updated successfully.",
      });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Reservation not found." });
    }
  } catch (error) {
    console.error("Error updating deposit:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update deposit status." });
  }
});

router.post("/checkedIn", async (req, res) => {
  const { reservation } = req.body;
  try {
    const thisReservation = await Reservation.findOne({ _id: reservation._id });
    thisReservation.checkedIn = true;
    await thisReservation.save();
    res.status(200).json({ success: true, message: "Checked In" });
  } catch (err) {
    res
      .status(500)
      .json({ success: true, message: "api checkIn Error: " + err });
  }
});

module.exports = router;
