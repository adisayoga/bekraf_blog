
var User = require('../models/user');

module.exports = function(app) {
  return {

    register: function(req, res) {
      res.render('auth/register', {title: 'Register'});
    },

    saveRegister: function(req, res) {
      var data = {
        username:   req.body.username,
        password:   req.body.password,
        created_at: Date.now(),
        updated_at: Date.now()
      };
      User.create(data, function(err, item) {
        if (err) return console.error(err);
        res.redirect('/');
      });
    },

    login: function(req, res) {
      var errors = req.flash('error');
      res.render('auth/login', {title: 'Login', errors: errors});
    }
  }
};
