'use strict';

var express = require('express');
var controller = require('./player.controller');

var router = express.Router();

router.get('/', controller.index);
router.put('/', controller.update);
router.get('/:id', controller.findById);
router.post('/:id/skills', controller.setSkill);
router.post('/:id/items', controller.setItem);

module.exports = router;
