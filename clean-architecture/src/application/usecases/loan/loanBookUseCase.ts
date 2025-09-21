import { IdGeneratorInterface } from "./../../../domain/utils/idGeneratorInterface";
import { LoanRepositoryInterface } from "../../../domain/repositories/loanRepositoryInterface";
import { Loan } from "../../../domain/entities/loan";
import { LoanBookRequestDto } from "../../dtos/loan/loanBookRequestDto";
import { LoanBookResponseDto } from "../../dtos/loan/loanBookResponseDto";
import { LoanBookUseCaseInterface } from "./loanBookUseCaseInterface";
import { BookRepositoryInterface } from "../../../domain/repositories/bookRepositryInterface";
import { TransactionManagerInterface } from "../../utils/transactionManagerInterface";

export class LoanBookUseCase implements LoanBookUseCaseInterface {
  constructor(
    private readonly loanRepository: LoanRepositoryInterface,
    private readonly bookRepository: BookRepositoryInterface,
    private readonly IdGenerator: IdGeneratorInterface,
    private readonly transactionManager: TransactionManagerInterface
  ) {}

  async execute(requestDto: LoanBookRequestDto): Promise<LoanBookResponseDto> {
    return await this.transactionManager.run(async (ctx) => {
      // 貸出可能か確認
      const book = await this.bookRepository.findById(requestDto.bookId, ctx);
      if (!book) {
        throw new Error("Book not found");
      }
      book.loan();

      // userの貸し出し可能数の確認
      const loans = await this.loanRepository.findByUserId(
        requestDto.userId,
        ctx
      );
      if (loans.filter((loan) => loan.returnDate === null).length >= 5) {
        throw new Error("既に上限まで貸し出されています。");
      }

      await this.bookRepository.update(book, ctx);

      const newLoan = new Loan(
        this.IdGenerator.generate(),
        requestDto.bookId,
        requestDto.userId,
        new Date()
      );
      // dbに保存
      const createdLoan = await this.loanRepository.create(newLoan, ctx);

      // responseDtoに変換して返す
      const responseDto: LoanBookResponseDto = {
        id: createdLoan.id,
        bookId: createdLoan.bookId,
        userId: createdLoan.userId,
        loanDate: createdLoan.loanDate,
        dueDate: createdLoan.dueDate,
        createdAt: createdLoan.createdAt,
        updatedAt: createdLoan.updatedAt,
      };
      return responseDto;
    });
  }
}
