let express = require('express');
const router = express.Router();

const leitoresController = require('../controllers/leitoresController');

router.get('/list', leitoresController.getAll);

module.exports = router;