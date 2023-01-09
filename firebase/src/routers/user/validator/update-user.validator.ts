import {body, param} from "express-validator";

export const updateUserValidator = [
  param('id').isInt().notEmpty().toInt(),
  body('name')
    .isString()
    .isLength({ max: 20, min: 5 })
    .notEmpty()
    .optional({ nullable: true }),

  body('email')
    .isEmail()
    .notEmpty()
    .optional({ nullable: true }),

  body('age')
    .isInt({ max: 100, min: 10, })
    .notEmpty()
    .optional({ nullable: true }),

  body('avatar')
    .isURL()
    .optional({ nullable: true }),

  body('isAdmin')
    .isBoolean()
    .optional({ nullable: true })
    .default(false),
]