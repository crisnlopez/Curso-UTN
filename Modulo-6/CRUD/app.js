var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

require('dotenv').config();

// //---Armando Router--//
var indexRouter = require('./routes/index'); // index.js
// var usersRouter = require('./routes/users');
var aprendeAjedrezRouter = require('./routes/aprendeAjedrez'); // aprendeAjedrez.js
var sobreMiRouter = require('./routes/sobreMi');  // sobreMi.js
var contactoRouter = require('./routes/contacto'); // contacto.js
var novedadesRouter = require('./routes/novedades') // novedades.js
var loginRouter = require('./routes/admin/login') // admin/login.js
var adminRouter = require('./routes/admin/novedades'); // admin/novedades.js

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//---Usando Session--//
app.use(session({
  secret: 'zeh8NUUB2Xqpvjjr72hr',
  resave: false,
  saveUninitialized: true
}))

secured = async (req, res, next) => {
  try {
    console.log(req.session.id_usuario);
    if (req.session.id_usuario) {
      next();
    } else {
      res.redirect('/admin/login');
    }
  } catch(error) {
    console.error(error);
  }
}

// //---Usando Router--//
app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/aprendeAjedrez', aprendeAjedrezRouter);
app.use('/sobreMi', sobreMiRouter);
app.use('/contacto', contactoRouter);
app.use('/novedades', novedadesRouter)
app.use('/admin/login', loginRouter);
app.use('/admin/novedades', secured, adminRouter);


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

module.exports = app;
