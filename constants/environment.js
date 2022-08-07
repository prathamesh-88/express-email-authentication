const path  = require('path');
const NODE_ENV =  'development'; //'production';
const LOG_DESTINATION = path.join(__dirname, '../access.logs');

if (NODE_ENV === 'development') {
    require('dotenv').config({path: path.join(__dirname, '..', '.env.dev')});
}else if(NODE_ENV === 'production'){
    require('dotenv').config();
}

module.exports = {
    LOG_DESTINATION,
    NODE_ENV,
    // Redis Client Configuration
    REDIS_HOST: process.env.REDIS_HOST || 'localhost',
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    //MongoDB Client Configuration
    MONGODB_URI : process.env.MONGODB_URI,
    //Server port
    PORT        : process.env.PORT || 3000,
    //Session Secret
    SESSION_SECRET: process.env.SESSION_SECRET,
    //Email service configuration
    EMAIL_SERVER: process.env.EMAIL_SERVER,
    EMAIL_PORT: process.env.EMAIL_PORT || 587,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    //Other configuration
    ORGANISATION_NAME: process.env.ORGANISATION_NAME ||process.env.EMAIL_USER,
}
