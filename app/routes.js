
module.exports = function(app) {
  var blog = require('./controllers/blogCtrl')(app);

  app.get    ('/',                 blog.index);
  app.get    ('/blog',             blog.index);
  app.get    ('/blog/create',      blog.insert);
  app.post   ('/blog/create',      blog.saveInsert);
  app.get    ('/blog/:id',         blog.view);
  app.get    ('/blog/update/:id',  blog.update);
  app.put    ('/blog/update/:id',  blog.saveUpdate);
  app.delete ('/blog/delete/:id',  blog.delete);

};
