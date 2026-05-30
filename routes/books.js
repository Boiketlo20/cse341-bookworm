const express = require('express')
const router = express.Router();

const bookCon = require('../controllers/books')
const validation = require('../middleware/validate');
const auth = require('../middleware/authenticate');


router.get('/book', bookCon.getAll);

router.get('/book/:id', bookCon.getOne);

router.post('/book', auth.isAuthenticated, validation.saveBook, bookCon.uploadBook);

router.put('/book/:id', auth.isAuthenticated, validation.saveBook, bookCon.updateBook);

router.delete('/book/:id', auth.isAuthenticated, bookCon.deleteBook);

module.exports = router; 