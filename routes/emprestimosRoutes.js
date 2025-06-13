const express = require('express');
const router = express.Router();
const emprestimosController = require('../controllers/emprestimosController');

router.get('/', emprestimosController.getAll);

router.get('/:id', emprestimosController.getById);

router.post('/', emprestimosController.create);

router.put('/:id', emprestimosController.update);

router.delete('/:id', emprestimosController.delete);

module.exports = router;
