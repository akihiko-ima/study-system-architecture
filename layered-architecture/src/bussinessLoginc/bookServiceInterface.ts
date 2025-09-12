import { Book } from "../generated/prisma";

export interface BookServiceInterface {
  add(title: string): Promise<Book>;
  findById(id: string): Promise<Book | null>;
}
