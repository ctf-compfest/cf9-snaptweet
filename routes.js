const Router = require('koa-router');
const UserController = require('./controllers/User');
const PostController = require('./controllers/Post');

const router = new Router({
  prefix: '/api',
});

router.get('/users', UserController.getAll);
router.get('/users/:id', UserController.get);
router.post('/users', UserController.post);
router.put('/users', UserController.put);

router.get('/posts', PostController.getAll);
router.get('/posts/:id', PostController.get);
router.post('/posts', PostController.post);
router.put('/posts', PostController.put);

module.exports = router;
