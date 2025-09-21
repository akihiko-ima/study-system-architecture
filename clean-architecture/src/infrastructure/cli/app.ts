import { PrismaClient } from "../../generated/prisma";
import { UuidGenerator } from "../../adapter/utils/uuidGenerator";
import { PrismaBookRepository } from "../../adapter/repositories/prismaBookRepositry";
import { AddBookUseCase } from "../../application/usecases/book/addBookUseCase";
import { BookCommand } from "../../adapter/commands/bookCommand";
import inquirer from "inquirer";

async function main() {
  const prisma = new PrismaClient();
  const uuidGenerator = new UuidGenerator();
  const bookRepository = new PrismaBookRepository(prisma);
  const addBookUseCase = new AddBookUseCase(bookRepository, uuidGenerator);
  const bookCommand = new BookCommand(addBookUseCase);

  const { command } = await inquirer.prompt([
    {
      type: "list",
      name: "command",
      message: "どのコマンドを実行しますか？",
      choices: ["書籍の登録"],
    },
  ]);

  if (command === "書籍の登録") {
    const { title } = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "タイトルを入力してください",
      },
    ]);
    await bookCommand.addBook(title);
  }
}

main();
