const routes = require('express').Router();
const controller = require('../controller/user');

routes.get('/:userId', controller.getUserById);
routes.post('/', controller.createUser);
routes.delete('/:id', controller.deleteUser);
routes.put('/:userId', controller.updateUser);


module.exports = routes;