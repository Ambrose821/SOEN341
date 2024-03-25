const mongoose = require('mongoose');

const BranchSchema = new mongoose.Schema({
  BranchName: {
    type: String,
    unique: true,
    required: true
  },
  location: {
    type: {
      type: String, // This is required for GeoJSON types
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number], // Array of numbers for longitude and latitude
      required: true
    }
    // Note: 'unique: true' is not applicable to individual fields in a subdocument like 'location'.
    // If you want 'location' to be unique, you would need a custom validation approach.
  },
});

// Apply a 2dsphere index to 'location' for GeoJSON coordinates
BranchSchema.index({ location: '2dsphere' });

module.exports = mongoose.model("Branch", BranchSchema);