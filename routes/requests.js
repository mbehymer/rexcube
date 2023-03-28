const router = require('express').Router();
const controller = require('../controller/requestsController');
const { requiresAuth } = require('express-openid-connect');

router.get('/', controller.getAllRequests);
router.get('/:userId', controller.getRequestByUserId);
router.post('/new', controller.createNewRequest);
router.put('/:requestId', controller.updateRequest);
router.delete('/:requestId', requiresAuth() ,controller.deleteRequest);

module.exports = router;
