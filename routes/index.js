const router = require('express').Router();
// const activityController = require


routes.use('/activity', require('./activity.ts'));
routes.use('/requests', require('./requests.ts'));
routes.use('/category', require('./category.ts'));
routes.use('/user', require('./user.ts'));




module.exports = router;