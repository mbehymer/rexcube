const routes = require('express').Router();
const controller = require('../controller/user');

routes.get('/', controller.getUserLogin);
routes.get('/', controller.getUserLogout); //this wont work because it is the same route as the one above. Probably dont need these routes.
routes.post('/', controller.createUser);
routes.delete('/:id', controller.deleteUser);
routes.put('/:userId', controller.updateUser);


module.exports = routes;