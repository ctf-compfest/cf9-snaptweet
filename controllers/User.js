const User = require('../models/User');

async function getAll(ctx) {
  ctx.body = await User.find();
}

async function getLogin(ctx) {
  ctx.body = ctx.state.user;
}

async function get(ctx) {
  const { username } = ctx.params;
  let user = null;

  if (ctx.request.query.populate) {
    user = await User.findOne({ username });
    const posts = await user.getPosts();
    user = user.toJSON();
    user.posts = posts;
  } else {
    user = await User.findOne({ username });
  }

  ctx.body = user;
}

async function post(ctx) {
  delete ctx.request.body.role;
  ctx.body = await new User(ctx.request.body).save();
}

// whole update
async function put(ctx) {
  const { username } = ctx.params;
  const data = ctx.request.body;
  delete data.id;
  delete data.username;
  delete data.role;
  data.username = username;
  try {
    ctx.body = await User.update({ username }, data);
  } catch (err) {
    ctx.status = 400;
  }
}

module.exports = {
  get,
  getLogin,
  getAll,
  post,
  put,
};
