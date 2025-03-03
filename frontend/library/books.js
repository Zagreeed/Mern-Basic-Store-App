import { create } from "zustand";

export const useBookStore = create((set) => ({
  books: [],
  setBooks: (books) => set({ books }),
  createBook: async (newBook) => {
    if (!newBook.title || !newBook.price || !newBook.author || !newBook.image) {
      return { success: false, message: "Please fill all Fields" };
    }

    const res = await fetch("/api/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    const data = await res.json();

    set((state) => ({ books: [...state.books, data.data] }));
    return { success: true, message: "Book Created Successfully" };
  },
  fetchBooks: async () => {
    const res = await fetch("/api/book");

    const data = await res.json();

    set({ books: data.data });
  },
  deleteBook: async (pId) => {
    const res = await fetch(`/api/book/${pId}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };

    //upate the ui without needing a refresh
    set((state) => ({ books: state.books.filter((book) => book._id !== pId) }));
    return { message: data.message, success: data.success };
  },
  updateBook: async (pId, updatedBook) => {
    const res = await fetch(`/api/book/${pId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    });

    const data = await res.json();

    if (!data.success) {
      return { message: data.message, success: false };
    }

    set((state) => ({
      books: state.books.map((book) => (book._id == pId ? data.data : book)),
    }));
    return { message: data.message, success: data.success };
  },
}));
