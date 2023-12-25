var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var registerRouter = require('./routes/register');
//khai báo router
// var toyRouter = require('./routes/toy');
// var customerRouter = require('./routes/customer');
var categoryRouter = require('./routes/category');
var toyRouter = require('./routes/toy');

var app = express();

//khai báo và cấu hình thư viện dateFormat, equal cho hbs
var hbs = require('hbs');
// hbs.registerHelper('dateFormat', require('handlebars-dateformat'));
hbs.registerHelper('equal', require('handlebars-helper-equal'))


//khai báo & cấu hình mongoose
var mongoose = require('mongoose');
//Note: cần khai báo tên db ở cuối uri của connection string
var uri = "mongodb+srv://phuongnam:123@cluster1.9asstlb.mongodb.net/asm";
//disable mongoose warning in terminal
mongoose.set('strictQuery', true);
mongoose.connect(uri)
  .then(() => console.log('connect to db ok'))
  .catch((err) => console.log('connect to db error'));


//khai báo & cấu hình body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);
// app.use('/users', usersRouter);
// app.use('/customer', customerRouter);
// app.use('/register', registerRouter);
app.use('/toy', toyRouter);
app.use('/category', categoryRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// cấu hình port của server để deploy lên cloud
app.listen(process.env.PORT || 3001);

module.exports = app;