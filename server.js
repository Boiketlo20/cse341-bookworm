const express = require('express')
const app = express()
const routes = require('./routes/index')
const mongodb = require('./database/data')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');


const port = process.env.PORT || 8080 ;

app.use(bodyParser.json());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}));
// This is the basic express session{{..}} initialization
app.use(passport.initialize())
// init passport on every route call
app.use(passport.session())
// allow passport to use 'express session'
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Orgin, X-Requested-With, Content-Type, Accept, Z-key, Authorization"
    )
    res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, GET , PUT, PATCH, OPETIONS, DELETE"
    );
    next();
})
app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}));
app.use(cors({ origin: '*'}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', routes);

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    //User.findOrCreate({ githubId: profile.id}, function (err, user) {
    return done(null, profile);
    //});
}
));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: $(err'\n)` + `Exception origin: ${origin}`);
});

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) =>{
    done(null, user);
});

app.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")
});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });

mongodb.initDb((err, mongodb) =>{
    if (err) {
        console.log(err);
    }   else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`)
    }
});


