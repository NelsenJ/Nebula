const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema);
module.exports = User;