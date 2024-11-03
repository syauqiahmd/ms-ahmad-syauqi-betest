const mongoose = require('mongoose');

const config = {
  url: process.env.MONGODB_URI,
  dbName: process.env.MONGO_DB_NAME,
};

const connectMongoDb = async () => {
  try {
    return await mongoose.connect(config.url, {
      dbName: config.dbName,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  config,
  connectMongoDb,
};
