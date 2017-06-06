const saltRounds = 10;

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var schema = new mongoose.Schema({
  username: {type: String, unique: true},
  password: String,
  created_at: Date,
  updated_at: Date
});

schema.pre('save', function(next) {
  if (!this.isModified('password')) return next();

  // Encrypt password
  var user = this;
  bcrypt.hash(user.password, saltRounds, function(err, hash) {
    if (err) return next(err);
    user.password = hash;
    next(null, hash);
  });
});

schema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  })
};

schema.statics.localStrategy = function() {
  var user = this;
  return function(username, password, next) {
    user.findOne({username: username}, function(err, user) {
      if (err) return next(err);
      if (!user) {
        console.warn('Incorrect username');
        return next(null, false, {message: 'Incorrect username.'});
      }
      user.comparePassword(password, function(err, isMatch) {
        if (!isMatch) {
          console.warn('Incorrect password');
          return next(null, false, {message: 'Incorrect password.'});
        }
        console.info('Login success.');
        next(null, user);
      });
    });
  }
};

var model = mongoose.model('User', schema);
module.exports = model;
