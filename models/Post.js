const mongoose = require('mongoose');
const { Schema } = mongoose;

const Post = new Schema({
  body: String,
  created_at: Date,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
});

if (!Post.options.toJSON) Post.options.toJSON = {};
Post.options.toJSON.transform = (doc, ret, opts) => ({
  body: ret.body,
  created_at: ret.created_at,
  author: ret.author,
});

Post.pre('save', function(next) {
  if (!this.created_at) this.created_at = new Date();
  next();
});

module.exports = mongoose.model('Post', Post);
