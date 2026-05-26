const express = require('express')
const router = express.Router();

const bookCon = require('../controllers/books')

router.get('/book', bookCon.getAll);

router.get('/book/:id', bookCon.getOne);

router.post('/book', bookCon.uploadBook);

router.put('/book/:id', bookCon.updateBook);

router.delete('/book/:id', bookCon.deleteBook);

module.exports = router; 