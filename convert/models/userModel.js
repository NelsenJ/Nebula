const mongoose = require('mongoose');

// Define User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { 
    type: String, 
    enum: ['male', 'female'], 
    required: true 
  },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
});

// Create and export the model
const User = mongoose.model('User', userSchema);
module.exports = User;
