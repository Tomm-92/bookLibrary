const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');

router.post('/', bookController.createUser);
router.get('/', bookController.getBooks );
router.get('/:id', bookController.getBookbyId);
router.delete('/:id', bookController.deleteBookById)
router.patch(':/id', bookController.updateById)

module.exports = router;