const User = require('../models/userModel');
const paginationHelper = require('../helpers/paginationHelper');

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
      password,
      identityNumber,
    });

    res.send({ message: `success create user ${user.userName}` });
  } catch (err) {
    res.send(err);
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

    res.send({ data: result });
  } catch (err) {
    res.send(err);
  }
};

const getUserDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findById(id);
    if (!result) res.send({ data: [] });
    res.send({ data: result });
  } catch (err) {
    res.send(err.Error);
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
    const user = await User.findByIdAndUpdate(id, {
      ...userName && { userName },
      ...password && { password },
      ...accountNumber && { accountNumber },
      ...emailAddress && { emailAddress },
      ...identityNumber && { identityNumber },
    });

    if (!user) return res.send({ data: [] });

    res.send({ message: `success update user id : ${user._id}` });
  } catch (err) {
    res.send(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.send({ data: [] });
    res.send({ message: `success delete user id : ${user._id}` });
  } catch (err) {
    res.send(err.Error);
  }
};

module.exports = {
  addUser,
  getUserList,
  getUserDetail,
  updateUser,
  deleteUser,
};
