const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genre');

router
    .route('/')
    .post(genreController.createGenre)
    .get(genreController.getGenres);

router
    .route('/:id')
    .get(genreController.getGenreById)
    .delete(genreController.deleteGenreById)
    .patch(genreController.updateGenre);

module.exports = router;