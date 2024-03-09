const Vehicle = require('../models/Vehicle')

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
            kilometers
         } = req.body;
         
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
        })
        await car.save()
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
      

        next();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        next(error);
    }
};


module.exports = { addCar, deleteCar };