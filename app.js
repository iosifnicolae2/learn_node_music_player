var express = require('express');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var client = require('./routes/client');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);


/*
  Express is a minimal and flexible Node.js web application framework
  that provides a robust set of features for web and mobile applications.
  Read more about Express: https://expressjs.com/en/guide/routing.html
  https://www.youtube.com/watch?v=xDCKcNBFsuI
*/
// view engine setup
app.set('views', path.join(__dirname, 'views'));
// EJS is a template engine
// Read more about EJS here: https://github.com/tj/ejs#includes
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// The below lines are used to include some libraries that help us to parse cookies, GET and POST parameters and so on..
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var urlencodedParser = bodyParser.urlencoded({ extended: false })


// The above line of code expose the content of `public` folder to the client
// For example, when you make a request to http://localhost:3000/stylesheets/style.css
// style.css file is served as response.
app.use(express.static(path.join(__dirname, 'public')));

// Register a router for `/` path
// `index` is a module that expose an Express router.
app.use('/', client(io));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found :)))))');
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

http.listen(3000, function(){
  console.log('listening on *:3000');
});
