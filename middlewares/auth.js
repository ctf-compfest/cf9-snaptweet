const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const User = require('../models/User');
const jwt = require('jsonwebtoken');

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(null, false, { message: err });
  }
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (user.password === password) {
        done(null, user);
      } else {
        done(null, false, { message: 'Incorrect password' });
      }
    } catch (err) {
      done(null, false, { message: 'Incorrect username' });
    }
  })
);

passport.use(
  new BearerStrategy(async (token, done) => {
    const decoded = decode(token);
    if (!decoded) {
      done(null, false);
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      done(null, false);
    }

    done(null, user);
  })
);

const login = (ctx, next) => {
  return passport.authenticate('local', (err, user, info) => {
    if (user === false) {
      ctx.status = 401;
      ctx.body = info.message;
    } else {
      const token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: '1h',
      });
      ctx.body = { token };
    }
  })(ctx, next);
};

const authenticate = (ctx, next) => {
  return passport.authenticate('bearer', async (err, user) => {
    if (user === false) {
      ctx.status = 401;
      ctx.body = 'Unauthorized';
    } else {
      ctx.state.user = user;
      await next();
    }
  })(ctx, next);
};

const onlyAdmin = (ctx, next) => {
  if (ctx.state.user && ctx.state.user.role === 'admin') {
    next();
  } else {
    ctx.status = 401;
    ctx.body = 'Unauthorized';
  }
};

const decode = token => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    return decoded;
  } catch (err) {
    return false;
  }
};

module.exports = {
  passport,
  login,
  authenticate,
  onlyAdmin,
  decode,
};
