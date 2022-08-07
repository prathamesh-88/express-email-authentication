//Hashing Setup
const SHA256 = require("crypto-js/sha256");

//Database controllers
const { addEntry, findOneEntry, updateOneEntry } = require('../services/mongo.js');

// Custom made utility function to verify user details
const { verifyUserDetails, userProcess } = require('../utility/verify.js')

//Global constants
const { SUCCESS, FAILED } = require('../constants/global.js');

// Mailer service
const { createToken, verifyToken } = require('../utility/tokens.js');

// Schema
const User = require('../schema/User.js');

// Check if user already exists
async function userExist(email) {
    let result = await findOneEntry('template', 'users', { email: email });

    if (result.status === SUCCESS) {
        return {
            status: true,
            result: result.result
        }
    } else if (result.status === FAILED) {
        return {
            status: false,
            error: result.error
        }
    } else {
        return {
            status: false,
            error: 'Database error'
        }
    }

}

// Controller for /signup
async function addUser(req, res) {
    console.log("Signup function began");
    let user = {};
    try {
        for (i in User.required) {
            if (!req.body[i]) {
                throw 'Missing required field';
            }
            user[i] = req.body[i];
        }
        for (i in User.optional) {
            if (req.body[i]) {
                user[i] = req.body[i];
            }
        }
    } catch (e) {
        return res.send({
            status: FAILED,
            error: e
        });
    }
    console.log("Verification done")
    let results;
    let isExistingUser = await userExist(user.email);
    console.log("Existing User checked")
    if (isExistingUser.status) {
        results = {
            status: FAILED,
            error: 'User already exists'
        }
    } else if (!isExistingUser['status'] && isExistingUser.error === 'Database error') {
        results = {
            status: FAILED,
            error: 'Database error'
        }
    } else {
        const user_status = verifyUserDetails(user);
        if (user_status.status) {
            user = userProcess(user)
            let result = await addEntry('template', 'users', user);
            if (result.status === SUCCESS) {
                results = {
                    status: SUCCESS,
                    _id: result._id
                }
            } else if (result.status === FAILED) {
                results = {
                    status: FAILED,
                    error: result.error
                }
            }
        } else {
            results = {
                status: FAILED,
                error: user_status.error
            }
        }
    }
    console.log("finished")
    return res.send(results);

}

// Controller for /login
async function login(req, res) {
    console.log("Login function began");
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    let results;
    const queryResult = await findOneEntry('template', 'users', { email: user.email });
    if (queryResult.status === SUCCESS) {
        const password = SHA256(queryResult.result.password.salt + user.password).toString();
        if (queryResult.result.password.password === password) {
            session = req.session;
            session.user = {
                _id     : queryResult.result._id,
                fname   : queryResult.result.fname,
                lname   : queryResult.result.lname,
                email   : queryResult.result.email,
                verified: queryResult.result.verified
            };
            results = {
                status: SUCCESS,
                _id: queryResult.result._id,
            }
        } else {
            results = {
                status: FAILED,
                error: 'Incorrect password'
            }
        }
    } else {
        results = {
            status: FAILED,
            error: 'User does not exist'
        }
    }
    return res.send(results);
}

// Controller for /logout
function logout(req, res) {
    if (req.session.user) {
        req.session.destroy();
        return res.send({
            status: SUCCESS,
            description: 'Logged out successfully'
        });
    } else {
        return res.send({
            status: FAILED,
            description: 'Not logged in!'
        });
    }
}

// Controller for /verify
async function sendVerificationMail(req, res) {
    const { sendMail } = require('../services/mailer.js');
    const userId    = req.session.user._id;
    const token     = await createToken(userId);
    const results   = await sendMail({
        to: req.session.user.email,
        subject: 'Verify your account',
        html: `<h1>Verify your account</h1><a href='/verify/${token}>`,
        text: `Complete the verification for complete access to all features`
    })
    if (results.status === SUCCESS) {
        return res.send({
            status: SUCCESS,
            description: 'Verification email sent'
        });
    }else{
        return res.send({
            status: FAILED,
            error: 'Email sending failed'
        });
    }

}

// Controller for /verify/:id
async function verifyEmail(req, res) {
    const token = req.params.token;
    const status = await(verifyToken(req.session.user._id, token));
    if (status){
        const result = updateOneEntry('template', 'users', req.session.user, { verified: true });
        if (result.status === SUCCESS) {
            req.session.user.verified = true;
            return res.send({
                status: SUCCESS,
                description: 'Email verified'
            });
        }else{
            return res.send({
                status: FAILED,
                error: result.error
            });
        }
    }else{
        return res.send({
            status: FAILED,
            error: 'Email could not be verified! Try again'
        });
    }
}

module.exports = { addUser, login, sendVerificationMail, verifyEmail, logout };
