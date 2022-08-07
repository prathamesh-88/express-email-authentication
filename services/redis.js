
const {createClient} = require('redis');
const {REDIS_HOST, REDIS_PORT} = require('../constants/environment');

const getClient = async () => {
    //Configure redis client
    const redisClient = createClient({
        socket:{
            host: REDIS_HOST,
            port: REDIS_PORT
        }
    });

    redisClient.on('error', function (err) {
        console.log('Could not establish a connection with redis.');
    });

    redisClient.on('connect', function (err) {
        console.log('Connected to redis successfully');
    });

    redisClient.on('disconnect', function (err) {
        console.log('Disconnected from redis');
    });
    await redisClient.connect();
    return redisClient;
}

module.exports = {getClient};