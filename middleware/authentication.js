const {SUCCESS, FAILED} = require('../constants/global');

// For pages that require authentication
function authenticationRequired(req,res,next){
    if (!req.session.user){
        return res.send({
            status: FAILED,
            description: 'Need to login first!'
        })
    }
    next();
}

// For pages like login and signup
function redirectAuthenticated(req,res,next){
    if (req.session.user){
        return res.send({
            status: FAILED,
            description: 'Already logged in! Clear cookies or logout first!'
        })
    }
    next();
}

module.exports= {authenticationRequired, redirectAuthenticated};

