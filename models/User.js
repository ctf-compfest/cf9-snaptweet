const mongoose = require('mongoose');
const Post = require('./Post');

const { Schema } = mongoose;

const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

const User = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: ROLES.USER },
});

if (!User.options.toJSON) User.options.toJSON = {};
User.options.toJSON.transform = (doc, ret, opts) => ({
  id: ret._id,
  username: ret.username,
  email: ret.email,
  role: ret.role,
});

User.methods.getPosts = async function() {
  const posts = await Post.find({ author: this._id });
  return posts;
};

module.exports = mongoose.model('User', User);
