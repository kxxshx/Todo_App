const redis = require('redis');

const redisClient = redis.createClient({
    port: 6379,
    host: 'localhost'
});

redisClient.connect();
redisClient.on('connect', () => {
    console.log('Connected to Redis')
})
redisClient.on('error', () => {
    console.log(error)
})

module.exports = redisClient;