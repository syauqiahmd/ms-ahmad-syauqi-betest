module.exports = (page, pageSize) => ((Number(page) || 1) - 1) * (Number(pageSize) || 0);
