'use strict';

var express = require('express');
var controller = require('./game.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/user/:id', controller.getUserGames);
router.post('/', controller.createGame);
router.delete('/:id', controller.deleteGame);

module.exports = router;
