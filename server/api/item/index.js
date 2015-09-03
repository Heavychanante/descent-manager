'use strict';

var express = require('express');
var controller = require('./item.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/player/:id', controller.objetosAsignables);

module.exports = router;
