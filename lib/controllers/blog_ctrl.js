
module.exports = function(app) {
  return {

    index: function(req, res) {
      var Blog = require('../models/blog');
      Blog.find().sort({updated_at: -1}).exec(function(err, data) {
        res.render('blog/index', {data: data});
      });
    },

    view: function(req, res) {
      var Blog = require('../models/blog');
      Blog.findById(req.params.id, function(err, item) {
        if (err) return console.error(err);

        res.render('blog/view', {item: item, title: item.title});
      });
    },

    insert: function(req, res) {
      res.render('blog/edit', {title: 'Tulis Blog'});
    },

    saveInsert: function(req, res) {
      var Blog = require('../models/blog');
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

    edit: function(req, res) {
      var Blog = require('../models/blog');
      Blog.findById(req.params.id, function(err, item) {
        if (err) return console.error(err);
        res.render('blog/edit', {item: item, title: 'Edit Blog'});
      });
    },

    saveEdit: function(req, res) {
      var Blog = require('../models/blog');
      var data = {
        title:      req.body.title,
        body:       req.body.body,
        updated_at: Date.now()
      };
      Blog.findByIdAndUpdate(req.params.id, data, function(err, item) {
        if (err) return console.error(err);
        res.redirect('/blog/' + item._id);
      });
    },

    delete: function(req, res) {
      var Blog = require('../models/blog');
      Blog.findByIdAndRemove(req.params.id, function(err) {
        if (err) return console.error(err);

        res.redirect('/blog');
      });
    }
  }
};
