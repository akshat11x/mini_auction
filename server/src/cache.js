// cache.js - Upstash Redis client setup
const { Redis } = require('@upstash/redis');


const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || 'https://sincere-skylark-20560.upstash.io',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || 'AVBQAAIncDExNTM1N2I3YmZjZWE0ZDY0OGYzNWU4ZjlhZjczMjZkOHAxMjA1NjA',
});

module.exports = redis;
