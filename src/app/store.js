import { configureStore } from "@reduxjs/toolkit";
import { booksSlice } from "../features/books/booksSlice";
import { categoriesSlice } from "../features/categories/categoriesSlice";

// configuring the redux store
export default configureStore({
  reducer: {
    books: booksSlice.reducer,
    categories: categoriesSlice.reducer
  }
});
