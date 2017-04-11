const mongoose = require('mongoose');
const { Schema } = mongoose;

const Post = new Schema({
  body: String,
  created_at: Date,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
});

Post.pre('save', next => {
  if (!this.created_at) this.created_at = new Date();
  next();
});

module.exports = mongoose.model('Post', Post);
