import { Book } from "../generated/prisma";
import { BookService } from "./bookService";
import { BookRepositoryInterface } from "../dataAccess/bookRepositryInterface";

const mockBookRepository: jest.Mocked<BookRepositoryInterface> = {
  create: jest.fn(),
  findById: jest.fn(),
};

describe("BookService", () => {
  let bookService: BookService;
  beforeEach(() => {
    bookService = new BookService(mockBookRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("書籍の登録が成功する", async () => {
    const newBook: Book = {
      id: "1",
      title: "Test Book",
      is_available: true,
      created_at: new Date(),
      updated_at: new Date(),
    };
    mockBookRepository.create.mockResolvedValue(newBook);

    const result = await bookService.add("Test Book");
    expect(result).toEqual(newBook);
    expect(mockBookRepository.create).toHaveBeenCalledWith("Test Book");
  });
});
