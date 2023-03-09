const express = require('express');
const router = express.Router();
// const { requiresAuth } = require('express-openid-connect');

const activityFunc = require('../controller/activity');

router.get('/', activityFunc.getActivity);

router.get('/:activityId', activityFunc.getSingleActivityById);

router.post('/new', activityFunc.createActivity);

router.get('/:categoryId', activityFunc.getSingleActivityByCategory);

router.delete('/:activityId', activityFunc.deleteActivity);

module.exports = router;