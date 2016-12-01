var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var models = require('./models');
models.sequelize.sync();
var index = require('./routes/index');
var authenticate = require('./routes/authentication')(passport);
var socket = require('./routes/socket.js');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
io.sockets.on('connection', socket);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//providing auth-api to passport so that it can use it.
var initPassport = require('./passport/passport-init');
initPassport(passport);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat'
}));
app.use(passport.initialize()); //initializing passport
app.use(passport.session()); //initializing passport session

app.use('/', index);
app.use('/auth', authenticate);
app.use(express.static(path.join(__dirname, 'Angular')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'bower_components')));

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


//running server on node
server.listen(3000, function () {
  console.log('Example app listening at 3000');
});

module.exports = app;
