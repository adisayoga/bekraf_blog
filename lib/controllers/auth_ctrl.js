
var User = require('../models/user');

module.exports = function(app) {
  return {

    register: function(req, res) {
      res.render('auth/register', {title: 'Register'});
    },

    saveRegister: function(req, res) {
      var data = {
        username:      req.body.username,
        display_name:  req.body.display_name,
        password:      req.body.password,
        created_at:    Date.now(),
        updated_at:    Date.now()
      };
      User.findOne({username: data.username}, function(err, item) {
        if (err) return console.log(err);

        // Insert atau update data
        if (!item) {
          return User.create(data, function(err, item) {
            if (err) return console.error(err);
            res.redirect('/');
          });
        }

        item.display_name = data.display_name;
        item.password = data.password;
        item.updated_at = Date.now();
        item.save();
        res.redirect('/');
      });
    },

    login: function(req, res) {
      var errors = req.flash('error');
      res.render('auth/login', {title: 'Login', errors: errors});
    }
  }
};
