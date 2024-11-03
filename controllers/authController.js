const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { generateAuthToken } = require('../helpers/authHelper');
const redisService = require('../services/redisService');

const login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName });
    if (!user) throw new Error('please check your userName or password');
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('please check your userName or password');
    const token = await generateAuthToken(user);

    await redisService.setData(`VALID_TOKEN_${user._id}`, token, 3600);

    res.setHeader('Authorization', `Bearer ${token}`).send({ data: { token } });
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  login,
};
