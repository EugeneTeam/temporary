import { Request, Response, Router } from "express";

import { CreateUserInterface } from "./interfaces/create-user.interface";
import { createUserValidator } from "./validator/create-user.validator";
import { validatorMiddleware } from "../../common/middlewares/validator.middleware";
import { writeBasicOperation } from "../../firebase/operations/write-basic.operation";
import { readBasicOperation } from "../../firebase/operations/read-basic.operation";
import { getOneValidator } from "./validator/get-one.validator";
import { updateUserValidator } from "./validator/update-user.validator";
import { updateBasicOperator } from "../../firebase/operations/update-basic.operator";
import { UpdateUserInterface } from "./interfaces/update-user.interface";
import { removeBasicOperation } from "../../firebase/operations/remove-basic.operation";
import { deleteOneValidator } from "./validator/delete-one.validator";

export const userRouterInfo: Router = Router()

userRouterInfo.patch(
  '/user/update/childData',
  updateUserValidator,
  validatorMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    updateBasicOperator({test: true}, `users/childData/${1}`)
      .then(data => {
        res.status(200).json({
          data: null,
          success: data,
          error: null
        });
      })
      .catch(error => {
        res.status(400).json({
          error,
          success: false,
          data: null
        });
      });
  }
);

userRouterInfo.delete(
  '/user/delete/:id',
  deleteOneValidator,
  validatorMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    removeBasicOperation('users/1')
      .then(data => {
        res.status(200).json({
          data,
          error: null
        });
      })
      .catch(error => {
        console.log(error)
        res.status(400).json({
          error,
          data: null
        });
      });
  }
)

userRouterInfo.post(
  '/user/create',
  createUserValidator,
  validatorMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    const data: CreateUserInterface = req.body;

    writeBasicOperation<CreateUserInterface>(data, `users/${data.id}`)
      .then(data => {
        res.status(200).json({
          data,
          error: null
        });
      })
      .catch(error => {
        res.status(400).json({
          error,
          data: null
        });
      });
});

userRouterInfo.get(
  '/user/get-one/:id',
  getOneValidator,
  validatorMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    const id: number = Number(req.params.id);

    readBasicOperation(`users/${id}`)
      .then(data => {
        res.status(200).json({
          data: null,
          success: data,
          error: null
        });
      })
      .catch(error => {
        res.status(400).json({
          error,
          success: false,
          data: null
        });
      });
  }
);

userRouterInfo.patch(
  '/user/update/:id',
  updateUserValidator,
  validatorMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    const id: number = Number(req.params.id);
    const data: UpdateUserInterface = req.body;
    const user = await readBasicOperation(`users/${id}`);

    if (!user) {
      res.status(404).json({
        error: 'User not found',
      });
      return;
    }

    updateBasicOperator<UpdateUserInterface>(data, `users/${id}`)
      .then(data => {
        res.status(200).json({
          data: null,
          success: data,
          error: null
        });
      })
      .catch(error => {
        res.status(400).json({
          error,
          success: false,
          data: null
        });
      });
  }
);