const express = require('express');
const router = express.Router();
const livrosController = require('../controllers/livrosController');

router.get('/', livrosController.getAll);

router.get('/:id', livrosController.getById);

router.post('/', livrosController.create);

router.put('/:id', livrosController.update);

router.delete('/:id', livrosController.delete);

module.exports = router;
