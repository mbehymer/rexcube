const routes = require('express').Router();
const controller = require('../controller/user');
const { requiresAuth } = require('express-openid-connect');


routes.get('/', controller.getUserLogin);
routes.get('/', controller.getUserLogout);

// /user/
routes.post('/', requiresAuth(), controller.createUser);
routes.delete('/id', controller.deleteUser);
routes.put('/:userId', controller.updateUser);


module.exports = routes;