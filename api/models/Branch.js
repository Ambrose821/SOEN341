mongoose = require('mongoose')

const BranchSchema = mongoose.Schema({
    BranchName:{
        type:String,
        required:true
    },
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number], // Array of numbers
          required: true
        }
      }
      

})

module.exports = mongoose.model("Branch",BranchSchema)