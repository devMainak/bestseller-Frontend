import { configureStore } from "@reduxjs/toolkit";
import { booksSlice } from "../features/books/booksSlice"
import { categoriesSlice } from "../features/categories/categoriesSlice"
import { wishlistSlice } from "../features/wishlist/wishlistSlice"

// configuring the redux store
export default configureStore({
  reducer: {
    books: booksSlice.reducer,
    categories: categoriesSlice.reducer,
    wishlist: wishlistSlice.reducer
  }
});
