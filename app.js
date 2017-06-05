var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var method = require('method-override');
var app = express();

// moddleware
app.use(method('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

require('./routes')(app);

var port = process.env.PORT || 3000;
app.listen(port, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Server started on http://127.0.0.1:' + port);
});
