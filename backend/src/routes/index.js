const express = require('express');
const {authenticate} = require('../auth');
const router = express.Router();
const userRoute = require('./users');
const postRoute = require('./posts');
const likeRoute = require('./likes');


router.use("/users", userRoute);
router.use("/posts", postRoute);
router.use("/likes", likeRoute);
module.exports = router;