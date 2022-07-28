const {SUCCESS, FAILED} = require('../constants/global');

// For pages that require authentication
function authentication_required(req,res,next){
    if (!req.session.userid){
        return res.send({
            status: FAILED,
            description: 'Need to login first!'
        })
    }
    next();
}

// For pages like login and signup
function redirect_authenticated(req,res,next){
    if (req.session.userid){
        return res.send({
            status: FAILED,
            description: 'Already logged in! Clear cookies or logout first!'
        })
    }
    next();
}

module.exports= {authentication_required, redirect_authenticated};

