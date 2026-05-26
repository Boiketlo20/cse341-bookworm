const express = require('express')
const router = express.Router();

const bookCon = require('../controllers/books')

router.get('/book', bookCon.getAll);

router.get('/book/:id', bookCon.getOne);

module.exports = router;