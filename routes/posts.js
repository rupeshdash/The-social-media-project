const express = require('express');
const passport = require('passport');
const router = express.Router();

const postController = require('../controllers/posts_controller');

//only signed in users can post into the feed
router.post('/create',passport.checkAuthentication,postController.create);
// router.get('/display',postController.display);

module.exports = router;