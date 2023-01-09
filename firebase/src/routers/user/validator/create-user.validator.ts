import { body } from "express-validator";

export const createUserValidator = [
  body('id').isInt().notEmpty(),
  body('name').isString().isLength({ max: 20, min: 5 }).notEmpty(),
  body('email').isEmail().notEmpty(),
  body('age').isInt({ max: 100, min: 10, }).notEmpty(),
  body('avatar').isURL().optional({ nullable: true }),
  body('isAdmin').isBoolean().default(false),
]