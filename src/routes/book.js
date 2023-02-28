const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');

router.post('/', bookController.createUser);
router.get('/', bookController.getBook );

module.exports = router;