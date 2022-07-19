const express      = require('express');
var router         = express.Router();
const base_url     = 'http://localhost:3000/';
const jwt          = require('jsonwebtoken');
const mongoose     = require('mongoose');
const Users        = mongoose.model('user');
const User_otp     = mongoose.model('user_otp');
const Location     = mongoose.model('location');
const Category     = mongoose.model('category');
const Language     = mongoose.model('language');
const Schoolandcollege     = mongoose.model('schoolandcollege');




function get_current_date(){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
return today = yyyy + '-' + mm + '-' + dd + ' ' + time; 
}

const multer = require("multer");
const path = require('path');

const imageStorage = multer.diskStorage({
  destination: 'images', 
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() 
     + path.extname(file.originalname))
  }
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) { 
     return cb(new Error('Please upload a Image'))
   }
   cb(undefined, true)
 }
})



// Category  list api --  Pravas Chandra Nayak - 19-07-2022
router.get('/category_list',(req,res) => {
  var list1 = [];
  var condition = {};
  condition.status = "Active";
  condition.is_delete = "0";
  Category.find(condition).exec().then(async  category_data=>{
    if (category_data.length > 0) {
      let counInfo = 0;
      for(let i = 0; i < category_data.length; i++) {
        await (async function(rowData) {
          var u_data = {
            id      :rowData._id,
            name    :rowData.name,
            image   :rowData.image,
          };
          list1.push(u_data); 
        })(category_data[i]);
        counInfo++;
        if(counInfo == category_data.length) {
          res.status(200).json({
            status:true,
            message:"List successfully",
            results:list1,
          })
        }
      }
    }else{
     res.status(200).json({
      status:true,
      message:"Not Available !",
      results:list1,
    })
   }
 });
});


// Language  list api --  Pravas Chandra Nayak - 19-07-2022
router.get('/language_list',(req,res) => {
  var list1 = [];
  var condition = {};
  condition.status = "Active";
  condition.is_delete = "0";
  Language.find(condition).exec().then(async  language_data=>{
    if (language_data.length > 0) {
      let counInfo = 0;
      for(let i = 0; i < language_data.length; i++) {
        await (async function(rowData) {
          var u_data = {
            id      :rowData._id,
            name    :rowData.name,
          };
          list1.push(u_data); 
        })(language_data[i]);
        counInfo++;
        if(counInfo == language_data.length) {
          res.status(200).json({
            status:true,
            message:"List successfully",
            results:list1,
          })
        }
      }
    }else{
     res.status(200).json({
      status:true,
      message:"Not Available !",
      results:list1,
    })
   }
 });
});

// Schoolandcollege  list api --  Pravas Chandra Nayak - 19-07-2022
router.get('/schoolandcollege_list',(req,res) => {
  var list1 = [];
  var condition = {};
  condition.status = "Active";
  condition.is_delete = "0";
  Schoolandcollege.find(condition).exec().then(async  school_data=>{
    if (school_data.length > 0) {
      let counInfo = 0;
      for(let i = 0; i < school_data.length; i++) {
        await (async function(rowData) {
          var u_data = {
            id      :rowData._id,
            name    :rowData.name,
          };
          list1.push(u_data); 
        })(school_data[i]);
        counInfo++;
        if(counInfo == school_data.length) {
          res.status(200).json({
            status:true,
            message:"List successfully",
            results:list1,
          })
        }
      }
    }else{
     res.status(200).json({
      status:true,
      message:"Not Available !",
      results:list1,
    })
   }
 });
});


// User register api --  Pravas Chandra Nayak - 19-07-2022
router.get('/user_register',(req,res) => {
  var email             = (req.body.email) ? req.body.email : "";
  var first_name        = (req.body.first_name) ? req.body.first_name : "";
  var last_name         = (req.body.last_name) ? req.body.last_name : "";
  var gender            = (req.body.gender) ? req.body.gender : "";
  var password          = (req.body.password) ? req.body.password : "";
  var number            = (req.body.number) ? req.body.number : "";
  var schoolandcollege  = (req.body.schoolandcollege) ? req.body.schoolandcollege : "";
  var dob               = (req.body.dob) ? req.body.dob : "";
  var number            = (req.body.number) ? req.body.number : "";
  var deviceType        = (req.body.deviceType) ? req.body.deviceType : "";
  var deviceID          = (req.body.deviceID) ? req.body.deviceID : "";
  var deviceToken       = (req.body.deviceToken) ? req.body.deviceToken : "";
  if (email != "") {
    if (number != "") {
      Users.find({email:email}).exec().then(async  email_data=>{
        Users.find({number:number}).exec().then(async  number_data=>{
         if (email_data.length < 1) {
           if (number_data.length < 1) {
             if (refer_code_user != "") {
              const refer_data = await Users.findOne({refer_code:refer_code_user});
              if (refer_data) {
                var refer_id = refer_data._id;
              }else{
                var refer_id = 0;
              }
            }else{
              var refer_id = 0;
            }
            var start_date = new Date().toISOString().split('T')[0];
            var refer_code = refer_code_string()+refer_code_number();
            var new_user = new Users({refer_id:refer_id,refer_code:refer_code,Created_date:start_date,email:email,number:number,name:name,deviceType:deviceType,deviceID:deviceID,deviceToken:deviceToken,status:"Active"});
            new_user.save().then(doc=>{
              const token =  jwt.sign({user_id:doc._id,is_token_valide:1},'test');
              var data = [{
                id  :doc._id,
                name  :doc.name,
                email :doc.email,
                number:doc.number,
                img   :doc.img,
                refer_code :doc.refer_code,
                refer_id   :doc.refer_id,
                token :token,
              }];
              res.status(200).json({
                status:true,
                message:"user regester successfully",
                results:data,
              })
            });
          }else{
            return res.json({
              status:false,
              message:"number alrady exist",
              results:null,
            });
          }
        }else{
         return res.json({
          status:false,
          message:"email alrady exist",
          results:null,
        });
       }
     });
      });
    }else{
      return res.json({
        status:false,
        message:"Number require !",
        results:null,
      }); 
    }
  }else{
    return res.json({
      status:false,
      message:"Email require !",
      results:null,
    }); 
  }
});



module.exports = router;