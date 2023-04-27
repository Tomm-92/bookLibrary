const express = require('express');
const router = express.Router();
const readerController = require('../controllers/reader');

router
    .route('/')
    .get(readerController.getUsers)
    .post(readerController.createUser);


router
    .route('/:id')
    .get(readerController.getUserById)
    .delete(readerController.deleteUserById)
    .post(readerController.createUser)
    .patch(readerController.updateUser)


module.exports = router;
