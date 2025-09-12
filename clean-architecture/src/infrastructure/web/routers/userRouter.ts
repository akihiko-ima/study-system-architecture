import { Router } from "express";
import { UserController } from "../../../adapter/controllers/userController";

export function userRoutes(userController: UserController): Router {
  const router = Router();

  router.post("/", (req, res) => userController.createUser(req, res));

  return router;
}
