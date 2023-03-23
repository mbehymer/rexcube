const express = require('express');
const router = express.Router();
// const { requiresAuth } = require('express-openid-connect');

const activityFunc = require('../controller/activity');



/**
//  * 
* get:
 * tags['Activity']
 *  description: Get all of the activities
 *  responses:
 *      '200':
 *          description: A successful response
 *      '500':
 *          description: Internal Server Error
 */
router.get('/', activityFunc.getActivity);

router.get('/:activityId', activityFunc.getSingleActivityById);

// router.get('/new', (req, res) => {
//     res.send(__dirname + "/index.html");
//   });


router.post('/new', activityFunc.createActivity);

router.get('/:categoryId', activityFunc.getSingleActivityByCategory);

router.delete('/:id', activityFunc.deleteActivity);

module.exports = router;