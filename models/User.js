const mongoose = require('mongoose');
const Post = require('./Post');

const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

const User = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, default: ROLES.USER },
});

User.methods.getPosts = async function() {
  const posts = await Post.find({ user: this.id });
  return posts;
};

export default mongoose.model('User', User);
