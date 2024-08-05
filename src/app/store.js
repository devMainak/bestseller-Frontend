import { configureStore } from "react-redux";
import { booksSlice } from "../features/Books/booksSlice";

export default configureStore({
  reducer: {
    books: booksSlice.reducer,
  }
});
