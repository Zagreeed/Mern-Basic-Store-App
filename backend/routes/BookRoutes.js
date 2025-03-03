import express from "express";
import {
  createBook,
  deleteBook,
  getBooks,
  updateBook,
} from "../controllers/BookController.js";

const router = express.Router();

router.post("/", createBook);

router.get("/", getBooks);

router.delete("/:id", deleteBook);

router.put("/:id", updateBook);

export default router;
