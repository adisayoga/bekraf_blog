var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  title: String,
  subtitle: String,
  author: String,
  body: String,
  comments: [{ body: String, created_at: Date}],
  created_at: Date,
  updated_at: Date
});

var model = mongoose.model('Blog', schema);

module.exports = model;
