const express = require('express');
const router = express.Router();

const postController = require('../controllers/posts_controller');

router.post('/create',postController.create);
// router.get('/display',postController.display);

module.exports = router;