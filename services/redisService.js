const redis = require('redis');

const config = {
  url: process.env.REDIS_URI,
  standardTTL: process.env.REDIS_DEFAULT_TTL,
};

const client = redis.createClient({
  url: config.url,
});

const connectRedis = async () => {
  try {
    await client.connect();
  } catch (error) {
    console.log(error);
  }
};

const getData = async (key) => {
  const data = await client.get(key);
  return JSON.parse(data);
};

const setData = (key, value, timeout) => client.set(key, JSON.stringify(value), {
  EX: timeout || config.standardTTL,
});

const deleteData = (key) => client.del(key);

module.exports = {
  config,
  connectRedis,
  getData,
  setData,
  deleteData,
};
