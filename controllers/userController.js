const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const paginationHelper = require('../helpers/paginationHelper');
const identityHelper = require('../helpers/identityHelper');
const redisService = require('../services/redisService');
const { redisKey } = require('../helpers/constHelper');
const baseResponse = require('../helpers/baseResponse');
const { userListResponse, userDetailResponse } = require('../helpers/mapResponseHelper');

const addUser = async (req, res) => {
  const {
    userName,
    accountNumber,
    emailAddress,
    password,
    identityNumber,
  } = req.body;

  try {
    const user = await User.create({
      userName,
      accountNumber,
      emailAddress,
      password: await bcrypt.hash(password, 10),
      identityNumber,
    });

    res.send(baseResponse.successResponse());
  } catch (err) {
    res.send(baseResponse.errorResponse(err));
  }
};

const getUserList = async (req, res) => {
  try {
    const {
      userName,
      accountNumber,
      emailAddress,
      identityNumber,
      page,
      pageSize,
    } = req.query;

    const result = await User.find({
      ...userName && { userName },
      ...accountNumber && { accountNumber },
      ...emailAddress && { emailAddress },
      ...identityNumber && { identityNumber },
    }, null, {
      skip: paginationHelper(page, pageSize),
      limit: pageSize,
    });

    res.send(baseResponse.successResponse(userListResponse(result)));
  } catch (err) {
    res.send(baseResponse.errorResponse(err));
  }
};

const getUserDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const cachedData = await redisService.getData(`${redisKey.userDetail}_${id}`);
    if (cachedData) {
      return res.send(baseResponse.successResponse(cachedData));
    }

    const result = await User.findById(id);
    if (!result) throw new Error('data not found');

    const response = userDetailResponse(result);

    await redisService.setData(`${redisKey.userDetail}_${id}`, response);

    res.send(baseResponse.successResponse(response));
  } catch (err) {
    res.send(baseResponse.errorResponse(err));
  }
};

const updateUser = async (req, res) => {
  const {
    userName,
    accountNumber,
    emailAddress,
    password,
    identityNumber,
  } = req.body;
  const { id } = req.params;

  try {
    const userId = identityHelper.getUserId(req);
    if (userId !== id) throw new Error('user only can update own data');
    const user = await User.findByIdAndUpdate(id, {
      ...userName && { userName },
      ...password && { password: await bcrypt.hash(password, 10) },
      ...accountNumber && { accountNumber },
      ...emailAddress && { emailAddress },
      ...identityNumber && { identityNumber },
    });

    if (!user) throw new Error('data not found');

    await redisService.deleteData(`${redisKey.validToken}_${id}`);
    await redisService.deleteData(`${redisKey.userDetail}_${id}`);

    res.send(baseResponse.successResponse());
  } catch (err) {
    res.send(baseResponse.errorResponse(err));
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = identityHelper.getUserId(req);
    if (userId === id) throw new Error('user cant delete own data');
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error('data not found');

    await redisService.deleteData(`${redisKey.validToken}_${id}`);
    await redisService.deleteData(`${redisKey.userDetail}_${id}`);

    res.send(baseResponse.successResponse());
  } catch (err) {
    res.send(baseResponse.errorResponse(err));
  }
};

module.exports = {
  addUser,
  getUserList,
  getUserDetail,
  updateUser,
  deleteUser,
};
