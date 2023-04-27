const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');

router
    .route('/')
    .post(bookController.createBook)
    .get(bookController.getBooks);

router
    .route('/:id')
    .get(bookController.getBookById)
    .delete(bookController.deleteBookById)
    .patch(bookController.updateBook);

module.exports = router;
