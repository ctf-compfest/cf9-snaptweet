const Koa = require('koa');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
const app = new Koa();

// X-Response-Time
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(ctx => {
  ctx.body = 'Hello world';
});

app.listen(3000);
