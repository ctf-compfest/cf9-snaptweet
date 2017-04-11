const User = require('../models/User');

async function getAll(ctx) {
  ctx.body = await User.find();
}

async function get(ctx) {
  const { id } = ctx.params;
  let user = null;

  if (ctx.request.query.populate) {
    user = await User.findById(id).populate('posts');
  } else {
    user = await User.findById(id);
  }

  ctx.body = user;
}

async function post(ctx) {
  ctx.body = await new User(ctx.request.body).save();
}

// whole update
async function put(ctx) {
  const { id } = ctx.params;
  ctx.body = await User.update({ _id: id }, ctx.request.body);
}

module.exports = {
  get,
  getAll,
  post,
  put,
};
