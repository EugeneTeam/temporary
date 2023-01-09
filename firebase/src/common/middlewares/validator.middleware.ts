import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const validatorMiddleware = (req: Request, res: Response, next: NextFunction): any => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({errors: errors.array()});
    }
  } catch (err) {
    return next(err);
  }
  return next();
}