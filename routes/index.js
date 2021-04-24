const { Router } = require('express');
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');


console.log("Roter is running");


router.get('/',homeController.home);  //this .home is sccessible because in router folder index.js we have created the module.exports.home , where home at as an object which we can access here

// router.get('/profile',homeController.profile); --->> Just for demo
module.exports = router;