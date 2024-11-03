const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const transactionId = (req, res, next) => {
  const uniqId = uuidv4();
  req.transactionId = uniqId;
  const timeStamp = moment().format('YYYYMMDDHHmmssSSS');
  req.startTime = timeStamp;
  res.setHeader('transactionId', uniqId);
  res.setHeader('startTime', timeStamp);
  next();
};

module.exports = transactionId;
