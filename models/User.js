const mongoose = require('mongoose');
const Post = require('./Post');

const { Schema } = mongoose;

const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

const User = new Schema({
  username: String,
  email: String,
  password: String,
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  role: { type: String, default: ROLES.USER },
});

module.exports = mongoose.model('User', User);
