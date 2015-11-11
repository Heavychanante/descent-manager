'use strict';

var express = require('express');
var controller = require('./player.controller');

var router = express.Router();

router.get('/', controller.index);
router.put('/', controller.update);
router.get('/:id', controller.findById);
router.get('/game/:id', controller.getGamePlayers);
router.post('/:id/skills', controller.setSkill);
router.post('/:id/items', controller.setItem);
router.delete('/:jugadorId/skills/:habilidadId', controller.deleteSkill);
router.delete('/:jugadorId/items/:objetoId', controller.deleteItem);

module.exports = router;
