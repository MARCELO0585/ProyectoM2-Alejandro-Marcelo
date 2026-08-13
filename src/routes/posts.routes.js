const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts.controller');
const { validatePost } = require('../middleware/validateInput');

router.get('/', postsController.getAll);
router.get('/:id', postsController.getById);
router.get('/author/:authorId', postsController.getByAuthorId);
router.post('/', validatePost, postsController.create);
router.put('/:id', postsController.update);
router.delete('/:id', postsController.delete);

module.exports = router;
