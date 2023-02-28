const express = require('express');
const router = express.Router();
const readerController = require('../controllers/reader');

router.post('/', readerController.createUser);
router.get('/', readerController.allUsers);
router.get('/:id', readerController.userById);
router.patch('/:id', readerController.updateById)
router.delete('/:id', readerController.deleteById);


module.exports = router;
