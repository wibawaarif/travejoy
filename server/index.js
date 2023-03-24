var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const sessions = require('express-session');
const MongoStore = require('connect-mongo');
const helmet = require('helmet')
require('dotenv').config()

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// router admin
const adminRouter = require('./routes/admin')
const apiRouter = require('./routes/api')

var app = express();

// view engine setup
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard());
app.use(helmet.xssFilter());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())
app.use(methodOverride('_method'))
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
  secret: 'zxcvbnm',
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    autoRemove: 'interval',
    autoRemoveInterval: 30,
  }),
  resave:false,
  saveUninitialized:false,
}))
app.use(flash())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/sb-admin-2', express.static(path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/api/v1/member', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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


connectDB();

app.listen(process.env.PORT || 3000, (test) => {
  console.log('Server running on port 3000')
})

module.exports = app;