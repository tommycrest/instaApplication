/////////////////////////////////////////////////////////
// Require di app.js
/////////////////////////////////////////////////////////
var http = require('http');
var openurl = require('openurl');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/////////////////////////////////////////////////////////
// Routes che utilizza l'app express di default 
/////////////////////////////////////////////////////////
var routes = require('./routes/index');
var users = require('./routes/users');
var instagram = require('./routes/instagram');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

///////////////////////////////////////////////////////////
// Politiche di routing definite dall'applicazione
///////////////////////////////////////////////////////////
app.use('/', routes);
app.use('/index', routes);
app.use('/users', users);
app.use('/instagram', instagram);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// Init del server della nostra applicazione express
app.set('port', process.env.PORT || 3000);
var server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log('Server listing on localhost '+app.get('port'));
});

openurl.open('http://localhost:3000');


module.exports = app;
