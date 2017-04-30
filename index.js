require('dotenv').config();

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const mongoose = require('mongoose');
const logger = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const router = require('./routes');

mongoose.Promise = Promise;
mongoose.connect(process.env.DB_HOST);

const app = new Koa();

app.use(logger);
app.use(bodyParser());
app.use(serve(__dirname + '/client/build'));
app.use(auth.passport.initialize());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT);
console.log('Listening on port ' + process.env.PORT);
