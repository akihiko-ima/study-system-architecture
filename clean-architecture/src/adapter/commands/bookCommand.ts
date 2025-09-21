import { AddBookRequestDto } from "../../application/dtos/book/addBookRequestDto";
import { AddBookUseCaseInterface } from "../../application/usecases/book/addBookUseCaseInterface";

export class BookCommand {
  constructor(private readonly addBookUseCase: AddBookUseCaseInterface) {}

  async addBook(title: string): Promise<void> {
    try {
      const requestDto: AddBookRequestDto = { title };
      const book = await this.addBookUseCase.execute(requestDto);

      console.log("書籍を登録しました");
      console.log(book);
    } catch (error) {
      console.log(error);
      throw new Error("書籍の登録に失敗しました");
    }
  }
}
