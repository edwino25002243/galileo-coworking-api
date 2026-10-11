const { Queue } = require('bullmq');
const IORedis = require('ioredis');

const redisConnection = new IORedis('redis://redis:6379', {
    maxRetriesPerRequest: null
});

const emailQueue = new Queue('EmailQueue', { connection: redisConnection });

module.exports = { emailQueue, redisConnection };