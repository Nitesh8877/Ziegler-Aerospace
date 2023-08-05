const mongoose = require('mongoose');
const constant=require('../utils/constant')
const userSchema = new mongoose.Schema({
  username:  { 
    type: String,
     required: true
     },
  email: {
     type: String,
      required: true
     },
  password: { 
    type: String,
     required: true
     },
  role: {
     type: String,
      default: constant.buyer
     },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
