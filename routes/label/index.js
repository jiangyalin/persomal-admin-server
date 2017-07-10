const express = require('express');
const router = express.Router();

//标签列表
router.use('/',require('./label-list'));

module.exports = router;
