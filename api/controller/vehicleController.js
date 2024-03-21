const Vehicle = require('../models/Vehicle')
const Branch = require('../models/Branch')

const addCar = async (req, res, next) => {
    try {
        const {
            brand, 
            model, 
            VIN, 
            photoURL, 
            plate,
            year, 
            color,
            transmission,
            pricePerDay,
            numberOfSeats, 
            numberOfDoors,  
            style, 
            reservation, 
            lister, 
            kilometers, 
            branch
         } = req.body;

         const carBranch = await Branch.findOne({BranchName:branch}) 
         
        var car = new Vehicle({
            brand: brand,
            model: model, 
            VIN: VIN, 
            photoURL: photoURL , 
            plate: plate,
            year: year, 
            color: color,
            transmission: transmission,
            pricePerDay: pricePerDay,
            numberOfSeats: numberOfSeats, 
            numberOfDoors: numberOfDoors,  
            style: style, 
            reservation: reservation, 
            lister: lister, 
            kilometers: kilometers,
            branch: carBranch._id
        })
      await car.save()
      res.status(201).json({success:true, message: "Car Added Succesfully"})
        next();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};



const deleteCar = async (req, res, next) => {
    const { deleteVIN } = req.body;

    try {
        console.log(deleteVIN);
        let vinToDelete = await Vehicle.findOneAndDelete({ VIN : deleteVIN }).lean();
        console.log(vinToDelete);

        if (!vinToDelete) {
            return res.status(404).json({ success: false, message: 'No car found with the provided VIN' });
        }
        //vinToDelete = await Vehicle.deleteOne(vinToDelete);
        res.status(200).json({ success: true, message: 'Car deleted' });
      

        //next();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        next(error);
    }
};


const updateCar = async (req, res, next) => {
   // const { VIN, ...updatedData } = req.body;
  
  try {
    const { VIN, ...updatedData } = req.body;
      const existingCar = await Vehicle.findOne({ VIN: VIN });
      if (!existingCar) {
        return res.status(404).json({ success: false, message: 'No car found with the provided VIN' });
      }
  
      if (updatedData.brand) {
        existingCar.brand = updatedData.brand;
      }
      if (updatedData.model) {
        existingCar.model = updatedData.model;
      }
      if (updatedData.year) {
        existingCar.year = updatedData.year;
      }
      if (updatedData.color) {
        existingCar.color = updatedData.color;
      }
      if (updatedData.color) {
        existingCar.pricePerDay = updatedData.pricePerDay;
      }
      if (updatedData.branch) {
        existingCar.branch = updatedData.branch;
     }

      const updatedCar = await existingCar.save();
  
      res.status(200).json({ success: true, message: 'Car updated successfully', car: updatedCar });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
  
//const get_postal_code
const find_nearest = async (req, res, next) => {
  const postal_code = req.query.postal_code;
  const latitude = 43//temp
  const longitude =79//temp
  //mechanism to find closest branch assuming you can access coordinates
  try {
    const nearest_branch = await Branch.findOne({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          }
        }
      }
    })

    const branch_name = nearest_branch.BranchName
    res.status(200).json({success:true,message:`Nearest Branch is in ${branch_name}`, branch: nearest_branch })
  } catch (err) {
    console.error("Error finding nearest branch" + err);
    res.status(404).json({ success: false, message: "Couldnt Locate a branch" })
    next(err)
  }
}
  
  module.exports = { addCar, deleteCar, updateCar,find_nearest };