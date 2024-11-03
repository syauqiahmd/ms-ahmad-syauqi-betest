const maskData = (data) => {
  if (data && typeof data === 'string') {
    return data.substring(0, 3) + '*'.repeat(data.length - 3);
  }
  return data;
};

module.exports = { maskData };
