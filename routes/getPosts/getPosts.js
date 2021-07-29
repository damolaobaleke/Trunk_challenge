const express = require('express');
let router  = express.Router()
let middleWare =  require('../../middlewares/middleware')

const {getPosts, getPing} = require('../../controllers/getPosts/getPosts');

//sortBy & direction parameters are optional
router.get('/api/posts' ,getPosts)

router.get('/api/ping', getPing)

module.exports = router;