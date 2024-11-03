const { isEmpty } = require('lodash');
const baseResponse = require('./baseResponse');

const checkPayload = (options = {}) => (req, res, next) => {
  if (isEmpty(options)) {
    next();
  }

  if (!options.allowQuery && Object.keys(req.query).length > 0) {
    return res.status(400).send(baseResponse.errorResponse({ message: 'Query is not allowed' }));
  }
  if (!options.allowParams && Object.keys(req.params).length > 0) {
    return res.status(400).send(baseResponse.errorResponse({ message: 'Params are not allowed' }));
  }
  if (!options.allowBody && !isEmpty(req.body)) {
    return res.status(400).send(baseResponse.errorResponse({ message: 'Body is not allowed' }));
  }
  next();
};

module.exports = {
  checkPayload,
};
