const express = require('express')
const app = express()
const routes = require('./routes/index')

const port = process.env.PORT || 8080 ;

app.use('/', (req, res, next) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Running on port ${port}`)});


