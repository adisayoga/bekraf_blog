
module.exports = function(app) {
  return {

    index: function(req, res) {
      var Blog = require('../model/blog');
      Blog.find().sort({updated_at: -1}).exec(function(err, data) {
        res.render('blog/index', {data: data});
      });
    },

    view: function(req, res) {
      var Blog = require('../model/blog');
      Blog.findById(req.params.id, function(err, item) {
        if (err) return console.error(err);

        res.render('blog/view', {item: item});
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
        created_at: Date.now(),
        updated_at: Date.now()
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
