const express = require('express');
const router = express.Router();
// const { requiresAuth } = require('express-openid-connect');

const activityFunc = require('../controllers/activity.js');

router.get('/', activityFunc.getActivity);

router.get('/:activityId', activityFunc.getSingleActivityById);

router.post('/new', activityFunc.createActivity);

router.put('/:categoryId', activityFunc.getSingleActivityByCategory);

router.delete('/:activityId', activityFunc.deleteActivity);

module.exports = router;