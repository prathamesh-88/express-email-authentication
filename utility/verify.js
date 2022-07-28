const User = require('../schema/User.js');
const testRegExp = require('../utility/regex.js');

function verify_user_details(user){
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

module.exports = {verify_user_details}
