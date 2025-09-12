import { Router } from "express";
import { BookController } from "../../../adapter/controllers/bookController";

export function BookRoutes(bookController: BookController): Router {
  const router = Router();
  router.post("/", (req, res) => bookController.add(req, res));
  router.get("/:id", (req, res) => bookController.findById(req, res));
  return router;
}
