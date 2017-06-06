var express = require('express');
var layout = require('express-ejs-layouts');
var session = require('express-session');
var method = require('method-override');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var flash = require('connect-flash');

var app = express();

// middleware
app.use(express.static('public'));
app.use(layout);
app.use(session({ secret: 'xY7MtLFjJrCQ0iiF', resave: false, saveUninitialized: true }));
app.use(method('_method'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.use(function(req, res, next) {
  res.locals.user = req.user ? req.user : null;
  next();
});

// DB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');
var db = mongoose.connection;
db.on('error', function(err) {
  console.error('Connection error: ' + err);
});
db.once('open', function() {
  console.info('Database connected');
});

// Auth
var LocalStrategy = require('passport-local').Strategy;
var User = require('./lib/models/user');
passport.use(new LocalStrategy(User.localStrategy()));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Routes
require('./lib/routes')(app);

// Run
var port = process.env.PORT || 3000;
app.listen(port, function(err) {
  if (err) return console.error(err);
  console.log('Server started on http://127.0.0.1:' + port);
});

// ______________________________

// Format date
var moment = require('moment');
moment.locale('id');
Date.prototype.format = function(pattern) {
  return moment(this).format(pattern);
};

// Truncate string
// https://stackoverflow.com/questions/1199352/smart-way-to-shorten-long-strings-with-javascript
String.prototype.truncate = function(n, useWordBoundary) {
  if (this.length <= n) return this;

  var subString = this.substr(0, n - 1);
  return (useWordBoundary || useWordBoundary === undefined
    ? subString.substr(0, subString.lastIndexOf(' '))
    : subString) +
    '…';
};
