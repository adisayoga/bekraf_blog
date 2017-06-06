var passport = require('passport');

var protect = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

module.exports = function(app) {

  var blog = require('./controllers/blog_ctrl')(app);

  app.get  ('/',                           blog.index);
  app.get  ('/blog',                       blog.index);
  app.get  ('/blog/create',      protect,  blog.insert);
  app.post ('/blog/create',      protect,  blog.saveInsert);
  app.get  ('/blog/:id',                   blog.view);
  app.get  ('/blog/edit/:id',    protect,  blog.edit);
  app.put  ('/blog/edit/:id',    protect,  blog.saveEdit);
  app.get  ('/blog/delete/:id',  protect,  blog.delete);

  var auth = require('./controllers/auth_ctrl')(app);

  app.get  ('/register', auth.register);
  app.post ('/register', auth.saveRegister);
  app.get  ('/login',    auth.login);

  app.post ('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));
};
