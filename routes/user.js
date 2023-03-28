const routes = require('express').Router();
const controller = require('../controller/user');
const { requiresAuth } = require('express-openid-connect');

routes.get('/', controller.getUserLogin);
routes.get('/', controller.getUserLogout);
routes.post('/', controller.createUser);
routes.delete('/id', requiresAuth(), controller.deleteUser);
routes.put('/:userId', controller.updateUser);


module.exports = routes;