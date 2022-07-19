'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
 first_name: {
  type: String,
  required: 'Kindly enter the name'
},
last_name: {
  type: String,
  required: 'Kindly enter the name'
},
email: {
  type: String,
  required: 'Kindly enter the email'
},
number: {
  type: String,
  required: 'Kindly enter the number'
},
gender: {
  type: String,
  default: ""
},
password: {
  type: String,
  default: ""
},
schoolandcollege: {
  type: String,
  default: ""
},
profile_img: {
  type: String,
  default: ""
},
dob: {
  type: String,
  default: ""
},

Created_date: {
  type: String,
  default: ""
},
Updated_date: {
  type: String,
  default: ""
},
is_delete: {
  type: String,
  default: "0"
},
deviceToken: {
  type: String,
  default: ""
},
deviceId: {
  type: String,
  default: ""
},
otp: {
  type: String,
  default: ""
},
status: {
  type: String,
},

});

module.exports = mongoose.model('user', UserSchema);