const routes = require('express').Router();
const controller = require('../controller/user');

routes.get('/', controller.getUserLogin);
routes.get('/', controller.getUserLogout);
routes.post('/', controller.createUser);
routes.put('/', controller.updateUser);
routes.delete('/', controller.deleteUser);

module.exports = routes;