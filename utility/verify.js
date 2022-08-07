const User = require('../schema/User.js');
const testRegExp = require('../utility/regex.js');

function verifyUserDetails(user){
    for (i in User.required){
        if (!user[i] || !testRegExp(User.required[i], user[i])){
            return {
                status: false,
                error: 'User object does not match required format'
            };
        }
    }
    for (i in User.optional){
        if (!user[i] || !testRegExp(User.optional[i], user[i])){
            return {
                status: false,
                error: 'Type of optional fields do not match required format'
            };
        }
    }
    return {
        status: true,
        user: user
    };
}

// Convert user object to correct format for database
function userProcess(user){
    const salt      = crypto.randomBytes(32).toString('base64');
    const password  = SHA256(salt + user.password).toString();
    const tempUser = {
        fname : user['fname'],
        lname : user['lname'],
        email : user['email'],
        password : {
            password : password,
            salt: salt
        },
        verified : false
    }
    return tempUser;
}

module.exports = {verifyUserDetails, userProcess};
