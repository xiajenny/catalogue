var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//import mongoose
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/item");

var index = require('./routes/index');
var users = require('./routes/users');

//create item database
var itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  quantity: Number,
  purchaseLocation: String,
  purchaseMethod: String,
  reciept: String,
  picture: String,
  tag: Array,
  category: String,
  user_name: String
});

var Item = mongoose.model("Item", itemSchema);

Item.create({
  name: 'Herschel Backpack',
  description: 'this is a description',
  price: 70,
  quantity: 1,
  purchaseLocation: 'Nordstrom',
  purchaseMethod: 'Cash',
  reciept: 'https://expressexpense.com/images/itemized4-receipt-small.jpg',
picture: 'https://n.nordstrommedia.com/ImageGallery/store/product/Zoom/10/_101318470.jpg',
  tag: ['summer','fall','formal'],
  category: 'bags',
  user_name: 'Jackson Zheng'
}, function(err, item){
    if(err){
      console.log(err);
    } else{
        console.log("created new item");
        console.log(item);
    }
});

Item.find({}, function(err, items){
  if(err){
      console.log("ERROR!!");
      console.log(err);
  } else {
      console.log("all the items: ");
      console.log(items);
  }
});




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
