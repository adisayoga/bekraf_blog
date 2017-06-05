var express = require('express');
var expressLayout = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var method = require('method-override');
var moment = require('moment');

var app = express();

// middleware
app.use(expressLayout);
app.use(method('_method'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');

// DB
mongoose.connect('mongodb://localhost/blog');
var db = mongoose.connection;
db.on('error', function(err) {
  console.error('Connection error: ' + err);
});
db.once('open', function() {
  console.info('Database connected');
});

require('./src/routes')(app);

var port = process.env.PORT || 3000;
app.listen(port, function(err) {
  if (err) return console.error(err);
  console.log('Server started on http://127.0.0.1:' + port);
});

// Format date
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
