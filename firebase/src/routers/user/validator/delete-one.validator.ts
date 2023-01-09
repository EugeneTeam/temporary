import { param } from "express-validator";

export const deleteOneValidator = [
  param('id').isInt().notEmpty().toInt(),
]