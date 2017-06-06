
module.exports = function(app) {
  var blog = require('./controllers/blog_ctrl')(app);

  app.get    ('/',                 blog.index);
  app.get    ('/blog',             blog.index);
  app.get    ('/blog/create',      blog.insert);
  app.post   ('/blog/create',      blog.saveInsert);
  app.get    ('/blog/:id',         blog.view);
  app.get    ('/blog/edit/:id',    blog.edit);
  app.put    ('/blog/edit/:id',    blog.saveEdit);
  app.delete ('/blog/delete/:id',  blog.delete);

};
