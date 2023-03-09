const router = require('express').Router();
const controller = require('../controller/requestsController');

router.get('/', controller.getAllRequests);
router.get('/:userId', controller.getRequestByUserId);

router.post('/new', controller.createNewRequest);
router.put('/:requestId', controller.updateRequest);
router.delete('/:requestId', controller.deleteRequest);

module.exports = router;
