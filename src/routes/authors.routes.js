const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors.controller');
const { validateAuthor } = require('../middleware/validateInput');

router.get('/', authorsController.getAll);
router.get('/:id', authorsController.getById);
router.post('/', validateAuthor, authorsController.create);
router.put('/:id', authorsController.update);
router.delete('/:id', authorsController.delete);

module.exports = router;
