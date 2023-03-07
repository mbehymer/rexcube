const router = require('express').Router();
// const activityController = require


router.use('/activity', require('./activity.js'));
router.use('/requests', require('./requests.js'));
router.use('/category', require('./category.js'));
router.use('/user', require('./user.js'));




module.exports = router;