async function logger(ctx, next) {
  const start = new Date();

  const pad = number => ('0' + number).slice(-2);
  const formattedDate = `${pad(start.getHours())}:${pad(start.getMinutes())}:${pad(start.getSeconds())}`;
  console.log(`[${formattedDate}] ${ctx.method} ${ctx.url}`);

  await next();

  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
}

module.exports = logger;
