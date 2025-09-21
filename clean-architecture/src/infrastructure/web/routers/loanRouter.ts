import { Router } from "express";
import { LoanController } from "../../../adapter/controllers/loanController";

export function loanRoutes(loanController: LoanController): Router {
  const router = Router();

  router.post("/", (req, res) => loanController.loanBook(req, res));

  return router;
}
