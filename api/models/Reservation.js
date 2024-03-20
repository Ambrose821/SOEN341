const mongoose = require('mongoose')

const ReservationShchema = new mongoose.Schema({

        startDate:{
            type: Date,
            required:true
        },
        endDate:{
            type: Date,
            required:true
        },
        vehicle:{
           type:  mongoose.Schema.Types.ObjectId,
           ref: "Vehicle",
           required: true

        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    

})

module.exports = mongoose.model('Reservation',ReservationShchema);