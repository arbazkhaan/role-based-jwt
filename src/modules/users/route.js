const { Router } = require('express');

const router = Router();
const handlers = require('./handlers')();
const authorize = require('@middlewares/authorize')
const Role = require('@middlewares/role');

module.exports = () => {
  router.post('/users/signin', handlers.signin);

  router.post('/users/create', authorize(Role.Admin), handlers.create);

  router.delete('/users/:id', authorize(), handlers.delete);

  router.get('/users/:id', authorize(), handlers.get);

  router.get('/users', authorize(Role.Admin), handlers.list);
  
  router.patch('/users/:id', authorize(), handlers.update);

  return router;
};
