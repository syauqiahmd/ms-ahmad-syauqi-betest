const { get } = require('lodash');

const getUserId = (req) => get(req, 'user._id', '').toString();

module.exports = {
  getUserId,
};
