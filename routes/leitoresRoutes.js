const express = require('express');
const router = express.Router();
const leitoresController = require('../controllers/leitoresController');

router.get('/', leitoresController.getAll);

router.get('/:id', leitoresController.getById);

router.post('/', leitoresController.create);

router.put('/:id', leitoresController.update);

router.delete('/:id', leitoresController.delete);

module.exports = router;
