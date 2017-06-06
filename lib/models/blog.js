var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new mongoose.Schema({
  title: String,
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  body: String,
  comments: [{name: String, email: String, comment: String, created_at: Date}],
  created_at: Date,
  updated_at: Date
});

var model = mongoose.model('Blog', schema);

module.exports = model;
