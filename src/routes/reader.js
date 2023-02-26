const express = require('express');
const router = express.Router();
const readerController = require('../controllers/reader');

router.post('/', readerController.createUser);
router.get('/', readerController.allUsers);
router.get('/:id', readerController.userById);


module.exports = router;
