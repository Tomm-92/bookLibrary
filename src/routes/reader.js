const express = require('express');
const router = express.Router();
const readerController = require('../controllers/reader');


router.post('/', readerController.createUser)


module.exports = router;