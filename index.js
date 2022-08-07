// Basic Imports
var fs = require('fs');
const morgan = require('morgan');
const express = require('express');
const session = require('express-session');

//Import Controllers
const {addUser, login, sendVerificationMail, verifyEmail, logout} = require('./controllers/authentication');

//Import Constants
const {NODE_ENV, PORT, LOG_DESTINATION, SESSION_SECRET} = require('./constants/environment');

//Import Middleware
const {authenticationRequired, redirectAuthenticated} = require('./middleware/authentication');

//Redis Client Configuration
const {getClient} = require('./services/redis');
const RedisStore = require('connect-redis')(session);


// Initialize Express App
const app = express();

(async  () =>{
//Middleware declaration
const redisClient = await getClient();
app.use(session({
    store : new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    saveUninitialized: false
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


if (NODE_ENV === 'development') {
    app.use(morgan('dev'));
}else{
    // create a write stream (in append mode)
    var accessLogStream = fs.createWriteStream(LOG_DESTINATION, { flags: 'a' });
    // setup the logger
    app.use(morgan('combined', { stream: accessLogStream }))
}



app.post('/signup', (req, res) => addUser(req,res));
app.post('/login', redirectAuthenticated, (req, res)  => login(req,res));
app.post('/logout', (req, res) => { logout(req,res); });
app.get('/verify/:token', authenticationRequired,(req, res) => {verifyEmail(req,res);});
app.post('/verify', authenticationRequired, (req, res) => {sendVerificationMail(req,res);});
app.post('/isverified', authenticationRequired, (req, res) => {
    if (req.session.user.verified){
        return res.send({
            status: SUCCESS,
            description: 'Email verified'
        });
    }else{
        return res.send({
            status: FAILED,
            error: 'Email not verified'
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

})();