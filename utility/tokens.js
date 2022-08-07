const {getClient} = require('../services/redis.js');

const getToken = (len) => {
    const rand = () => { return Math.random().toString(36).substring(2); };
    const token = (length) => { return (rand() + rand() + rand() + rand()).substring(0, length); };
    
    return token(len);
}

const createToken = async (userId, options={
    expiry: 600
}) =>{
    const {expiry} = options;
    const token = getToken(64);
    const client = await getClient();
    await client.set(token, userId, 'EX', expiry, );
    await client.disconnect();
    return token;
}

const verifyToken = async (userId, token) => {
    const client = await getClient();
    const result = await client.get(token);
    await client.disconnect();
    return result === userId;
}

module.exports = {createToken, verifyToken};
