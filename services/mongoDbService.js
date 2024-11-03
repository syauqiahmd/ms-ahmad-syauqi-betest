const mongoose = require('mongoose');

const config = {
  url: process.env.MONGODB_URI,
  dbName: process.env.MONGO_DB_NAME,
};

const clientOptions = { dbName: process.env.MONGO_DB_NAME, serverApi: { version: '1', strict: true, deprecationErrors: true } };

const connectMongoDb = async () => {
  try {
    await mongoose.connect(config.url, clientOptions);
    console.log(`MongoDB Connected to ${config.dbName}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
  }
};

module.exports = {
  config,
  connectMongoDb,
};
