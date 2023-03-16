var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const sessions = require('express-session')
require('dotenv').config()


mongoose.connect(process.env.MONGO_URI);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// router admin
const adminRouter = require('./routes/admin')
const apiRouter = require('./routes/api')

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())
app.use(methodOverride('_method'))
const oneDay = 1000 * 60 * 60 * 24;
app.set("trust proxy", 1);
app.use(sessions({
  secret: 'zxcvbnm',
  resave: false,
  saveUninitialized: false,
  name: 'TravejoyServer',
  cookie: { maxAge: oneDay, sameSite: 'none', secure: false, httpOnly: false  }
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

app.listen(3000 , () => {
  console.log(`Example app listening on port 3000`)
})

module.exports = app;
