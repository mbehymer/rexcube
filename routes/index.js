const router = require('express').Router();
// const activityController = require


router.use('/activity', require('./activity'));
router.use('/requests', require('./requests'));
router.use('/category', require('./category'));
router.use('/user', require('./user'));




module.exports = router;