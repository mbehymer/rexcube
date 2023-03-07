const routes = require('express').Router();
const controller = require('../controller/category');

routes.post('/', controller.createCategory);
routes.put('/', controller.updateCategory);

module.exports = routes;