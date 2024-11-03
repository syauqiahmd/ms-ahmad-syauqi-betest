const jwt = require('jsonwebtoken');
const { isEmpty } = require('lodash');
const User = require('../models/userModel');
const redisService = require('../services/redisService');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decodToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decodToken._id });

    if (!user) throw new Error();

    // user need to get new token if there any update on user data / delete
    const validToken = await redisService.getData(`VALID_TOKEN_${user._id}`);

    if (isEmpty(validToken) || validToken !== token) throw new Error();

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: 'invalid token' });
  }
};

module.exports = {
  auth,
};
