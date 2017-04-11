const Post = require('../models/Post');

async function getAll(ctx) {
  ctx.body = await Post.find();
}

async function get(ctx) {
  const { id } = ctx.params;
  let Post = null;

  if (ctx.request.query.populate) {
    Post = await Post.findById(id).populate('author');
  } else {
    Post = await Post.findById(id);
  }

  ctx.body = Post;
}

// @TODO JWT
async function post(ctx) {
  ctx.body = await new Post(ctx.request.body).save();
}

// whole update
async function put(ctx) {
  const { id } = ctx.params;
  ctx.body = await Post.update({ _id: id }, ctx.request.body);
}

module.exports = {
  get,
  getAll,
  post,
  put,
};
