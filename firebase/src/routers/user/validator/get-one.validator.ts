import { param } from "express-validator";

export const getOneValidator = [
  param('id').isInt().notEmpty().toInt(),
]