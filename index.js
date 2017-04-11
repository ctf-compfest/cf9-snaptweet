const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const router = require('./routes');

mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/cf9-oops');
const app = new Koa();

// X-Response-Time
app.use(async (ctx, next) => {
  const start = new Date();
  const formattedDate = `${start.getHours()}:${start.getMinutes()}:${start.getSeconds()}`;
  console.log(`[${formattedDate}] ${ctx.method} ${ctx.url}`);

  await next();

  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
console.log('Listening on port 3000');
