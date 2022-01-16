const express = require('express');
const {authenticate} = require('../auth');
const router = express.Router();
const userRoute = require('./users');
const postRoute = require('./posts');
const likeRoute = require('./likes');
const commentRoute = require("./comments");


router.use("/users", userRoute);
router.use("/posts", postRoute);
router.use("/likes", likeRoute);
router.use("/comments", authenticate, commentRoute);
module.exports = router;