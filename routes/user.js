const routes = require('express').Router();
const controller = require('../controller/user');
const { requiresAuth } = require('express-openid-connect');

routes.get('/:userId', controller.getUserById);
routes.post('/', controller.createUser);

routes.delete('/:id', requiresAuth(), controller.deleteUser);

routes.put('/:userId', controller.updateUser);

module.exports = routes;