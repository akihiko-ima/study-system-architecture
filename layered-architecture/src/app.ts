import express from "express";
import { BookController } from "./presentation/bookController";
import { PrismaBookRepository } from "./dataAccess/prismaBookRepositry";
import { BookService } from "./bussinessLoginc/bookService";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const bookRepository = new PrismaBookRepository();
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

app.get("/", (req, res) => res.send("Hello World"));
app.post("/books", (req, res) => bookController.add(req, res));
app.get("/books/:id", (req, res) => bookController.findById(req, res));
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
