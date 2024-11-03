const Joi = require('joi');

const loginSchema = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  loginSchema,
};
