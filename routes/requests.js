const router = require('express').Router();
const controller = require('../controller/requestsController');

router.get('/requests', controller.getAllRequests);
router.get('/requests/:userId', controller.getRequestByUserId);

router.post('/requests/new', controller.createNewRequest);
router.put('/requests/:requestId', controller.updateRequest);
router.delete('/requests/:requestId', controller.deleteRequest);

module.exports = router;
