const { isEmpty } = require('lodash');
const { maskData } = require('./sercretHelper');

const userListResponse = (data) => {
  if (isEmpty(data)) {
    return [];
  }
  return data.map((item) => {
    const {
      _id,
      userName,
      accountNumber,
      emailAddress,
      identityNumber,
      createdAt,
      updatedAt,
    } = item;
    return {
      _id,
      userName,
      accountNumber: maskData(accountNumber),
      emailAddress,
      identityNumber: maskData(identityNumber),
      createdAt,
      updatedAt,
    };
  });
};
const userDetailResponse = (data) => {
  const {
    _id,
    userName,
    accountNumber,
    emailAddress,
    identityNumber,
    createdAt,
    updatedAt,
  } = data;

  return {
    _id,
    userName,
    accountNumber: maskData(accountNumber),
    emailAddress,
    identityNumber: maskData(identityNumber),
    createdAt,
    updatedAt,
  };
};

module.exports = {
  userListResponse,
  userDetailResponse,
};
