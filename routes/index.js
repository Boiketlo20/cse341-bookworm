const express = require('express')
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('Hello World!')
});

router.use('/', require('./books'));

router.use('/', require('./users'));

module.exports = router;