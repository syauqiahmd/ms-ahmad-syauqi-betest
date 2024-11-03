const router = require('express').Router();
const authController = require('../controllers/authController');
const { loginSchema } = require('../schemas/authSchema');
const { checkPayload } = require('../helpers/payloadValidationHelper');
const baseResponse = require('../helpers/baseResponse');

// const failHandler =

router.post(
  '/login',
  checkPayload({ allowBody: true }),
  (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).send(baseResponse.errorResponse(error));
    }
    next();
  },
  authController.login,
);

module.exports = router;
