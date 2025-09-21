import express from "express";

import { BookRoutes } from "./routers/bookRouter";
import { userRoutes } from "./routers/userRouter";
import { loanRoutes } from "./routers/loanRouter";
import { PrismaClient } from "../../generated/prisma";
import { PrismaTransactionManager } from "./../../adapter/utils/prismaTransactionManager";
import { UuidGenerator } from "../../adapter/utils/uuidGenerator";
import { PrismaBookRepository } from "../../adapter/repositories/prismaBookRepositry";
import { BookController } from "../../adapter/controllers/bookController";
import { AddBookUseCase } from "../../application/usecases/book/addBookUseCase";
import { FindBookByIdUseCase } from "../../application/usecases/book/findBookByIdUseCase";
import { PrismaUserRepository } from "../../adapter/repositories/prismaUserRepository";
import { CreateUserUseCase } from "../../application/usecases/user/createUserUseCase";
import { UserController } from "../../adapter/controllers/userController";
import { PrismaLoanRepository } from "../../adapter/repositories/prismaLoanRepository";
import { LoanBookUseCase } from "../../application/usecases/loan/loanBookUseCase";
import { LoanController } from "../../adapter/controllers/loanController";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const prisma = new PrismaClient();
const uuidGenerator = new UuidGenerator();
const transactionManager = new PrismaTransactionManager(prisma);

// book
const bookRepository = new PrismaBookRepository(prisma);
const addBookUseCase = new AddBookUseCase(bookRepository, uuidGenerator);
const findBookByIdUseCase = new FindBookByIdUseCase(bookRepository);
const bookController = new BookController(addBookUseCase, findBookByIdUseCase);
// user
const userRepository = new PrismaUserRepository(prisma);
const createUserUseCase = new CreateUserUseCase(userRepository, uuidGenerator);
const userController = new UserController(createUserUseCase);
// loan
const loanRepository = new PrismaLoanRepository(prisma);
const loanBookUseCase = new LoanBookUseCase(
  loanRepository,
  bookRepository,
  uuidGenerator,
  transactionManager
);
const loanController = new LoanController(loanBookUseCase);

app.get("/", (req, res) => res.send("Hello World"));
app.use("/books", BookRoutes(bookController));
app.use("/users", userRoutes(userController));
app.use("/loans", loanRoutes(loanController));

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
