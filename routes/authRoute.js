const router = require('express').Router();
const authController = require('../controllers/authController');
const { loginSchema } = require('../schemas/authSchema');
const { checkPayload } = require('../helpers/payloadValidationHelper');

// const failHandler =

router.post(
  '/login',
  checkPayload({ allowBody: true }),
  (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    next();
  },
  authController.login,
);

module.exports = router;
