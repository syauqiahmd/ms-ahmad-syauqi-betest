const router = require('express').Router();
const { checkPayload } = require('../helpers/payloadValidationHelper');
const userController = require('../controllers/userController');
const userSchema = require('../schemas/userSchema');

router.post(
  '/',
  checkPayload({ allowBody: true }),
  (req, res, next) => {
    const { error } = userSchema.createUser.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    next();
  },
  userController.addUser,
);

router.get(
  '/',
  checkPayload({ allowQuery: true }),
  (req, res, next) => {
    const { error } = userSchema.getUserList.validate(req.query);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    next();
  },
  userController.getUserList,
);

router.get(
  '/:id',
  checkPayload({ allowParams: true }),
  (req, res, next) => {
    const { error } = userSchema.getUserById.validate(req.params);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    next();
  },
  userController.getUserDetail,
);

router.put(
  '/:id',
  checkPayload({ allowParams: true, allowBody: true }),
  (req, res, next) => {
    const { error: paramsError } = userSchema.getUserById.validate(req.params);
    const { error: bodyError } = userSchema.updateUser.validate(req.body);
    const error = paramsError || bodyError;
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    next();
  },
  userController.updateUser,
);

router.delete(
  '/:id',
  checkPayload({ allowParams: true }),
  (req, res, next) => {
    const { error } = userSchema.getUserById.validate(req.params);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    next();
  },
  userController.deleteUser,
);

module.exports = router;
