const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    res.send({ message: 'Login successful', username, password });
  } catch (err) {
    res.status(500).send({ error: 'Internal server error' });
  }
};

module.exports = {
  login,
};
