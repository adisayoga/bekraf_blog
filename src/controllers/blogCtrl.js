
module.exports = function(app) {
  return {

    index: function(req, res) {
      res.render('blog/index');
    },

    view: function(req, res) {
      var Blog = require('../model/blog');
      Blog.find(function(err, data) {
        console.log(data);
        res.render('blog/view');
      });
    },

    insert: function(req, res) {
      res.render('blog/edit');
    },

    saveInsert: function(req, res) {
      var Blog = require('../model/blog');
      var data = {
        title:      req.body.title,
        body:       req.body.body,
        created_at: Date.now()
      };
      Blog.create(data, function(err, item) {
        res.redirect('/blog/' + item._id);
      });
    },

    update: function(req, res) {
      res.render('blog/edit');
    },

    saveUpdate: function(req, res) {
      res.send('Save update...');
    },

    delete: function(req, res) {
      res.send('Delete...');
    }
  }
};
