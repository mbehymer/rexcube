const routes = require('express').Router();
const controller = require('../controller/category');

routes.post('/', controller.createCategory);
routes.put('/:categoryId', controller.updateCategory);

module.exports = routes;