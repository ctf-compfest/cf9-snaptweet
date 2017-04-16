const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const logger = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const router = require('./routes');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/cf9-oops');

const app = new Koa();

app.use(logger);
app.use(bodyParser());
app.use(auth.passport.initialize());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
console.log('Listening on port 3000');
