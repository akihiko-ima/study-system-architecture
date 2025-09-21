import { Request, Response } from "express";
import { LoanBookUseCaseInterface } from "../../application/usecases/loan/loanBookUseCaseInterface";
import { LoanBookRequestDto } from "../../application/dtos/loan/loanBookRequestDto";
import { ReturnBookRequestDto } from "../../application/dtos/loan/returnBookRequestDto";
import { ReturnBookUseCaseInterface } from "../../application/usecases/loan/returnBookUseCaseInterface";

export class LoanController {
  constructor(
    private readonly loanBookUseCase: LoanBookUseCaseInterface,
    private readonly returnBookUseCase: ReturnBookUseCaseInterface
  ) {}

  async loanBook(req: Request, res: Response): Promise<void> {
    try {
      const requestDto: LoanBookRequestDto = {
        bookId: req.body.bookId,
        userId: req.body.userId,
      };
      const loan = await this.loanBookUseCase.execute(requestDto);

      // Add response status code
      res.status(201).json(loan);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "書籍の貸出に失敗しました" });
    }
  }

  async returnBook(req: Request, res: Response): Promise<void> {
    try {
      const requestDto: ReturnBookRequestDto = {
        id: req.body.id,
      };
      const loan = await this.returnBookUseCase.execute(requestDto);

      res.status(200).json(loan);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "書籍の返却に失敗しました" });
    }
  }
}
