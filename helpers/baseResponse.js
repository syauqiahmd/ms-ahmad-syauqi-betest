const successResponse = (data) => {
  const defaultResponse = {
    status: true,
    data: 'Success',
  };

  if (data) {
    defaultResponse.data = data;
  }

  return defaultResponse;
};

const errorResponse = (error) => {
  let errMessage = error.message || error.errorMessage || error || null;
  if (error.message) {
    errMessage = errMessage.replace(/"/g, '');
  }
  return {
    status: false,
    error: errMessage,
  };
};

module.exports = {
  successResponse,
  errorResponse,
};
