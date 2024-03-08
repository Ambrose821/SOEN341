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
    try {
        // const VIN = req.body;
        const carId = req.params.id;
        const deletedCar = await Vehicle.findByIdAndDelete(carId);
        
        if (!deletedCar) {
            return res.status(404).json({ success: false, message: 'Car not found' });
        }


        res.json({ success: true, message: 'Car deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


module.exports = addCar, deleteCar;