'use strict';

var express = require('express');
var controller = require('./skill.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/player/:id', controller.habilidadesAsignables);

module.exports = router;
