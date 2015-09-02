'use strict';

var express = require('express');
var controller = require('./player.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.findById);
router.post('/:id/skills', controller.setSkill);

module.exports = router;
