const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const BASE_PATH = process.env.BASE_PATH || '';
const BASE_URL = `http://localhost:${PORT}/${BASE_PATH}`;

const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const { auth } = require('./middleware/auth');
const transactionId = require('./middleware/transactionId');

const { connectMongoDb, config: configMongoDb } = require('./services/mongoDbService');
const { connectRedis, config: configRedis } = require('./services/redisService');

const baseResponse = require('./helpers/baseResponse');

app.listen(PORT, async () => {
  try {
    console.log(`app base url: ${BASE_URL}`);
    await connectMongoDb();
    console.log(`connected to mongoDb: ${configMongoDb.url}`);
    await connectRedis();
    console.log(`connected to redis: ${configRedis.url}`);
  } catch (err) {
    console.log(err);
  }
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use(`/${BASE_PATH}/auth`, transactionId, authRoute);
app.use(`/${BASE_PATH}/user`, transactionId, auth, userRoute);

app.get(`/${BASE_PATH}/test`, (req, res) => {
  res.status(200).send(baseResponse.successResponse({ message: 'service success to run' }));
});

app.use((req, res) => {
  res.status(404).send(baseResponse.errorResponse({ message: 'Not Found' }));
});
