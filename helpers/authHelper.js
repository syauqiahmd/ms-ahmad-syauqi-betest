const jwt = require('jsonwebtoken');

const generateAuthToken = async (user) => {
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
  );
  return token;
};

module.exports = {
  generateAuthToken,
};
