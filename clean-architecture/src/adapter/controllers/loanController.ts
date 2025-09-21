import { Request, Response } from "express";
import { LoanBookUseCaseInterface } from "../../application/usecases/loan/loanBookUseCaseInterface";
import { LoanBookRequestDto } from "../../application/dtos/loan/loanBookRequestDto";

export class LoanController {
  constructor(
    private readonly loanBookUseCase: LoanBookUseCaseInterface // Add other useCase propaties as needed
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
}
