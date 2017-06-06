var showdown = require('showdown');
var removeMarkdown = require('remove-markdown');
var Blog = require('../models/blog');

module.exports = function(app) {
  return {

    index: function(req, res) {
      Blog.find().sort({updated_at: -1}).populate('author').exec(function(err, data) {
        res.render('blog/index', {data: data, removeMarkdown: removeMarkdown, user: req.user});
      });
    },

    view: function(req, res) {
      var converter = new showdown.Converter();

      Blog.findById(req.params.id).populate('author').exec(function(err, item) {
        if (err) return console.error(err);

        res.render('blog/view', {
          item: item,
          body_html: converter.makeHtml(item.body),
          title: item.title
        });
      });
    },

    insert: function(req, res) {
      res.render('blog/edit', {title: 'Tulis Blog'});
    },

    saveInsert: function(req, res) {
      var data = {
        title:      req.body.title,
        author:     req.user._id,
        body:       req.body.body,
        created_at: Date.now(),
        updated_at: Date.now()
      };
      Blog.create(data, function(err, item) {
        if (err) return console.error(err);
        res.redirect('/blog/' + item._id);
      });
    },

    edit: function(req, res) {
      Blog.findById(req.params.id, function(err, item) {
        if (err) return console.error(err);
        res.render('blog/edit', {item: item, title: 'Edit Blog'});
      });
    },

    saveEdit: function(req, res) {
      var data = {
        title:      req.body.title,
        author:     req.user._id,
        body:       req.body.body,
        updated_at: Date.now()
      };
      Blog.findByIdAndUpdate(req.params.id, data, function(err, item) {
        if (err) return console.error(err);
        res.redirect('/blog/' + item._id);
      });
    },

    delete: function(req, res) {
      Blog.findByIdAndRemove(req.params.id, function(err) {
        if (err) return console.error(err);

        res.redirect('/blog');
      });
    }
  }
};
