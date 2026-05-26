const express = require('express')
const app = express()
const routes = require('./routes/index')
const mongodb = require('./database/data')

const port = process.env.PORT || 8080 ;

app.use('/', routes);

mongodb.initDb((err, mongodb) =>{
    if (err) {
        console.log(err);
    }   else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`)
    }
});


