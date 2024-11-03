const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { generateAuthToken } = require('../helpers/authHelper');

const login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName });
    if (!user) throw new Error('please check your userName or password');
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('please check your userName or password');
    const token = await generateAuthToken(user);
    res.setHeader('Authorization', `Bearer ${token}`).send({ data: { token } });
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  login,
};
