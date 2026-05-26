const express = require('express')
const router = express.Router();

const bookCon = require('../controllers/books')
const validation = require('../middleware/validate');

router.get('/book', bookCon.getAll);

router.get('/book/:id', bookCon.getOne);

router.post('/book', validation.saveBook, bookCon.uploadBook);

router.put('/book/:id', validation.saveBook, bookCon.updateBook);

router.delete('/book/:id', bookCon.deleteBook);

module.exports = router; 