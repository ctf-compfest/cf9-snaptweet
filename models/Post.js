const mongoose = require('mongoose');
const { Schema } = mongoose;

const EXPIRED_TIME = 1000 * 60 * 10;

const Post = new Schema({
  body: String,
  created_at: Date,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
});

if (!Post.options.toJSON) Post.options.toJSON = {};
Post.options.toJSON.transform = (doc, ret, opts) => ({
  id: ret._id,
  body: ret.body,
  created_at: ret.created_at,
  expired_on: doc.expired_on,
  author: ret.author,
});

Post.virtual('expired_on').get(function() {
  return new Date(this.created_at.getTime() + EXPIRED_TIME);
});

Post.virtual('expired').get(function() {
  return this.expired_on < new Date();
});

Post.statics.findNonExpired = function(q) {
  return this.find(
    Object.assign(q || {}, { created_at: { $gt: new Date() - EXPIRED_TIME } })
  );
};

Post.pre('save', function(next) {
  if (!this.created_at) this.created_at = new Date();
  next();
});

module.exports = mongoose.model('Post', Post);
