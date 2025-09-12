import { Book } from "../../../domain/entities/book";
import { BookRepositoryInterface } from "../../../domain/repositories/bookRepositryInterface";
import { IdGeneratorInterface } from "../../../domain/utils/idGeneratorInterface";
import { AddBookRequestDto } from "../../dtos/book/addBookRequestDto";
import { AddBookResponseDto } from "../../dtos/book/addBookResponseDto";
import { AddBookUseCaseInterface } from "./addBookUseCaseInterface";

export class AddBookUseCase implements AddBookUseCaseInterface {
  constructor(
    private readonly bookRepository: BookRepositoryInterface,
    private readonly idGenerator: IdGeneratorInterface
  ) {}

  async execute(requestDto: AddBookRequestDto): Promise<AddBookResponseDto> {
    const id = this.idGenerator.generate();
    const newBook = new Book(id, requestDto.title);
    const createBook = await this.bookRepository.create(newBook);
    return {
      id: createBook.id,
      title: createBook.title,
      isAvailable: createBook.isAvailable,
      createdAt: createBook.createdAt,
      updatedAt: createBook.updatedAt,
    };
  }
}
