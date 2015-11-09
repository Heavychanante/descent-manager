'use strict';

var express = require('express');
var controller = require('./class.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/archetype/:id', controller.getClassesByArchetype);

module.exports = router;
