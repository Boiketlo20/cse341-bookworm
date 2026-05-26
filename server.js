const express = require('express')
const app = express()
const routes = require('./routes/index')
const mongodb = require('./database/data')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const port = process.env.PORT || 8080 ;

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', routes);

mongodb.initDb((err, mongodb) =>{
    if (err) {
        console.log(err);
    }   else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`)
    }
});


