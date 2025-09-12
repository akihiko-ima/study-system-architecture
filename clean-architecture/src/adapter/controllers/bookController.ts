import { Request, Response } from "express";
import { AddBookRequestDto } from "../../application/dtos/book/addBookRequestDto";
import { AddBookUseCaseInterface } from "../../application/usecases/book/addBookUseCaseInterface";
import { FindBookByIdUseCase } from "../../application/usecases/book/findBookByIdUseCase";
import { FindBookByIdUseCaseInterface } from "../../application/usecases/book/findBookByIdUseCaseInterface";
import { FindBookByIdRequestDto } from "../../application/dtos/book/findBookByIdRequestDto";

export class BookController {
  constructor(
    private readonly addBookUseCase: AddBookUseCaseInterface,
    private readonly findBookByIdUseCase: FindBookByIdUseCaseInterface
  ) {}

  async add(req: Request, res: Response): Promise<void> {
    try {
      const requestDto: AddBookRequestDto = {
        title: req.body.title,
      };
      const book = await this.addBookUseCase.execute(requestDto);
      res.status(201).json(book);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "書籍の登録に失敗しました。" });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const requestDto: FindBookByIdRequestDto = {
        id: req.params.id,
      };
      const book = await this.findBookByIdUseCase.execute(requestDto);
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ error: "書籍が見つかりません。" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "書籍の取得に失敗しました。" });
    }
  }
}
