const { check, validationResult } = require('express-validator');

const validateCount = [
  check('count')
    .isInt({ min: 0 })
    .withMessage('El campo count debe ser un número entero positivo'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
]

const validateId = [
  check('id')
    .isInt({ min: 0 })
    .withMessage('El campo id debe ser un número entero positivo'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
]

const validateQuantity = [
  check('quantity')
    .isInt({ min: 0 })
    .withMessage('El campo quantity debe ser un número entero positivo'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
]

module.exports = { validateCount, validateId, validateQuantity }