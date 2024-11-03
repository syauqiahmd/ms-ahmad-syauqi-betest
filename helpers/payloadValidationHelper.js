const { isEmpty } = require('lodash');

const checkPayload = (options = {}) => (req, res, next) => {
  if (isEmpty(options)) {
    next();
  }

  if (!options.allowQuery && Object.keys(req.query).length > 0) {
    return res.status(400).send({ error: 'Query is not allowed' });
  }
  if (!options.allowParams && Object.keys(req.params).length > 0) {
    return res.status(400).send({ error: 'Params are not allowed' });
  }
  if (!options.allowBody && !isEmpty(req.body)) {
    return res.status(400).send({ error: 'Body is not allowed' });
  }
  next();
};

module.exports = {
  checkPayload,
};
