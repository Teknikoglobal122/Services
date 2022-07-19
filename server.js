require('./models/db');

const express = require('express');
const path = require('path');
const fileUpload = require("express-fileupload");
const multer = require("multer");
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
var cors = require('cors')

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(cors());

app.use(bodyparser.json());
app.use('/images',express.static(__dirname + '/images'));
app.listen(3000, 'localhost',() => {
    console.log('Express server started at port : 3000');
});

///------------------------API ------------------------------
const authAPIController = require('./controllers/webservice/AuthAPIController');
app.use('/auth_api', authAPIController);

