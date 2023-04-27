const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author')

router
    .route('/')
    .post(authorController.createAuthor)
    .get(authorController.getAuthors)

router
    .route('/:id')
    .get(authorController.getAuthorById)
    .delete(authorController.deleteAuthorById)
    .patch(authorController.updateAuthor);


module.exports = router;