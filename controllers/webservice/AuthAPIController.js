const express = require('express');
var router = express.Router();
const base_url = 'http://localhost:3000/';
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Users = mongoose.model('user');




function get_current_date() {
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
router.get('/category_list', (req, res) => {
  var list1 = [];
  var condition = {};
  condition.status = "Active";
  condition.is_delete = "0";
  Category.find(condition).exec().then(async category_data => {
    if (category_data.length > 0) {
      let counInfo = 0;
      for (let i = 0; i < category_data.length; i++) {
        await (async function (rowData) {
          var u_data = {
            id: rowData._id,
            name: rowData.name,
            image: rowData.image,
          };
          list1.push(u_data);
        })(category_data[i]);
        counInfo++;
        if (counInfo == category_data.length) {
          res.status(200).json({
            status: true,
            message: "List successfully",
            results: list1,
          })
        }
      }
    } else {
      res.status(200).json({
        status: true,
        message: "Not Available !",
        results: list1,
      })
    }
  });
});



module.exports = router;