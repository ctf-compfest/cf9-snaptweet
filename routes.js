const Router = require('koa-router');
const UserController = require('./controllers/User');
const PostController = require('./controllers/Post');
const auth = require('./middlewares/auth');

const router = new Router({
  prefix: '/api',
});

router.post('/login', auth.login);

router.get('/users', auth.authenticate, auth.onlyAdmin, UserController.getAll);
router.get('/users/me', auth.authenticate, UserController.getLogin);
router.get('/users/:username', auth.authenticate, UserController.get);
router.post('/users', UserController.post);
router.put(
  '/users/:username',
  auth.authenticate,
  auth.onlyAdmin,
  UserController.put
);

router.get('/posts', PostController.getAll);
router.get('/posts/:id', PostController.get);
router.post('/posts', auth.authenticate, PostController.post);

module.exports = router;
