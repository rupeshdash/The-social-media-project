const { Router } = require('express');
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');


console.log("Roter is running");

 //this .home is sccessible because in router folder index.js we have created the module.exports.home , where home at as an object which we can access here
router.get('/',homeController.home);


//when the local host server is fired it encounters that that need to come the index of routes and then the routers folder has the access
//to other urls as if the url be localhost:8000 then the router.get('/',homeController.home); will run and if the url be
//localhost:8000/user/profile then it first comes to the routers folder than the folder redirect it to router.use('/user',require('./users'));
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
// router.use('/likes',require('./likes'));
// router.use('/comments',require('./comments'));
//for further routes , access from here like this
//router.uses('/routerName',require('./routerFilename'));
router.use('/api', require('./api'));

module.exports = router;