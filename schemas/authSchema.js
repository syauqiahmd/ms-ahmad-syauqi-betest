const Joi = require('joi');

const loginSchema = Joi.object({
  user: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  loginSchema,
};
