const Post = require('../models/Post');

async function getAll(ctx) {
  ctx.body = await Post.find();
}

async function get(ctx) {
  const { id } = ctx.params;
  let post = null;

  if (ctx.request.query.populate) {
    post = await Post.findById(id).populate('author');
  } else {
    post = await Post.findById(id);
  }

  ctx.body = post;
}

async function post(ctx) {
  const user = ctx.state.user;
  const data = ctx.request.body;
  data.author = user.id;
  ctx.body = await new Post(data).save();
}

module.exports = {
  get,
  getAll,
  post,
};