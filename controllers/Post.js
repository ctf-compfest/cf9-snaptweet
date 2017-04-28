const Post = require('../models/Post');

async function getAll(ctx) {
  if (ctx.request.query.populate) {
    ctx.body = await Post.findNonExpired()
      .sort('-created_at')
      .populate('author');
  } else {
    ctx.body = await Post.findNonExpired().sort('-created_at');
  }
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
