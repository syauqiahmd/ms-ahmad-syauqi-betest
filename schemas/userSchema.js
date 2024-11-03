const Joi = require('joi');

const createUser = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().min(8).required(),
  accountNumber: Joi.string().min(6).required(),
  emailAddress: Joi.string().email().required(),
  identityNumber: Joi.string().min(16).required(),
});

const updateUser = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().min(8).required(),
  accountNumber: Joi.string().min(6).required(),
  emailAddress: Joi.string().email().required(),
  identityNumber: Joi.string().min(16).required(),
});

const getUserList = Joi.object({
  userName: Joi.string().optional(),
  accountNumber: Joi.string().min(6).optional(),
  emailAddress: Joi.string().email().optional(),
  identityNumber: Joi.string().min(16).optional(),
  page: Joi.number().min(0).optional().default(1),
  pageSize: Joi.number().min(0).optional().max(25)
    .default(10),
});

const getUserById = Joi.object({
  id: Joi.string().required(),
});

module.exports = {
  createUser,
  updateUser,
  getUserList,
  getUserById,
};
