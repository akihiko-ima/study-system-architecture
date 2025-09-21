import { LoanRepositoryInterface } from "../../../domain/repositories/loanRepositoryInterface";
import { Loan } from "../../../domain/entities/loan";
import { ReturnBookRequestDto } from "../../dtos/loan/returnBookRequestDto";
import { ReturnBookResponseDto } from "../../dtos/loan/returnBookResponseDto";
import { ReturnBookUseCaseInterface } from "./returnBookUseCaseInterface";
import { BookRepositoryInterface } from "../../../domain/repositories/bookRepositryInterface";
import { TransactionManagerInterface } from "../../utils/transactionManagerInterface";

export class ReturnBookUseCase implements ReturnBookUseCaseInterface {
  constructor(
    private readonly loanRepository: LoanRepositoryInterface,
    private readonly bookRepository: BookRepositoryInterface,
    private readonly transactionManager: TransactionManagerInterface
  ) {}

  async execute(
    requestDto: ReturnBookRequestDto
  ): Promise<ReturnBookResponseDto> {
    return await this.transactionManager.run(async (ctx) => {
      const loan = await this.loanRepository.findById(requestDto.id, ctx);
      if (!loan) {
        throw new Error("貸出記録が存在しません");
      }

      const book = await this.bookRepository.findById(loan.bookId, ctx);
      if (!book) {
        throw new Error("書籍が存在しません");
      }

      book.return();
      await this.bookRepository.update(book, ctx);

      loan.return();
      const updatedLoan = await this.loanRepository.update(loan, ctx);

      return {
        id: updatedLoan.id,
        returnDate: updatedLoan.returnDate,
        createdAt: updatedLoan.createdAt,
        updatedAt: updatedLoan.updatedAt,
      };
    });
  }
}
