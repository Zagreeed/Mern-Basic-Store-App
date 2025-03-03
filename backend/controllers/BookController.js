import Book from "../model/BookModel.js";
import mongoose from "mongoose";

export const createBook = async (req, res) => {
  const book = req.body;

  if (!book.title || !book.price || !book.author || !book.image) {
    return res
      .status(400)
      .json({ message: "Please fill all the fields", success: false });
  }

  const newBook = await Book.create(book);

  try {
    await newBook.save();
    res.status(201).json({
      message: "Book successfully Created",
      success: true,
      data: newBook,
    });
  } catch (error) {
    console.log(`!!!!!ERROR IN CREATION OF THIS BOOK: ${error.message}`);
    res.status(500).json({
      message: "Something went wrong maybe check the server???",
      success: fasle,
    });
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    console.log(`Theres Error in getting the books : ${error.message}`);
    res.status(500).json({
      message:
        "Something went wrong while getting the books maybe check the delete api in the server ??? ",
    });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    await Book.findByIdAndDelete(id);
    res.status(200).json({ message: "Successfully DELETED", success: true });
  } catch (error) {
    console.log(`Theres Error in deleting the book : ${error.message}`);
    res.status(404).json({
      message:
        "Something went wrong while deleting the book maybe check the server or the id if its correct??? ",
      success: false,
    });
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const updatedBook = req.body;

  try {
    await Book.findByIdAndUpdate(id, updatedBook, { new: true });
    res.status(200).json({
      message: `The Book was Updated Successfully`,
      success: true,
      data: updatedBook,
    });
  } catch (error) {
    console.log(`Theres Error in Updating the book : ${error.message}`);
    res.status(500).json({
      message:
        "Something went wrong while UPDATING the book maybe check the server or the id if its correct??? ",
    });
  }
};
