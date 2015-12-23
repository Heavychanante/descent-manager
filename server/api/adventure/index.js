'use strict';

var express = require('express');
var controller = require('./adventure.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/game/:id', controller.getGameAdventures);

module.exports = router;
