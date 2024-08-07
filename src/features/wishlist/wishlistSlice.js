import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async to function to fetch wishlist books
export const fetchWishlist = createAsyncThunk("fetch/wishlist", async () => {
  const response = await axios.get("https://9dbaed3b-94c5-4327-8a1b-6921422f3eba-00-32qwd9xgzzr57.pike.replit.dev/wishlist")

  return response.data
})

// Async action creator function to add book to wishlist
export const addBookToWishlistAsync = createAsyncThunk(
  "add/wishlist",
  async (book) => {
    const response = await axios.post(
      "https://9dbaed3b-94c5-4327-8a1b-6921422f3eba-00-32qwd9xgzzr57.pike.replit.dev/wishlist", book)

    return response.data;
  }
);

// Async action creator function to delete book from wishlist
export const deleteBookFromWishlistAsync = createAsyncThunk(
  "delete/wishlist",
  async (bookId) => {
    const response = await axios.delete(
      `https://9dbaed3b-94c5-4327-8a1b-6921422f3eba-00-32qwd9xgzzr57.pike.replit.dev/wishlist/${bookId}`)

    return response.data;
  }
);

// Creating redux slice for wishlist
export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Pending case for fetchWishlist
    builder.addCase(fetchWishlist.pending, (state) => {
      state.status = "loading"
    })
    // Fulfilled case for fetchWishlist
    builder.addCase(fetchWishlist.fulfilled, (state, action) => {
      state.status = "success"
      state.wishlist = action.payload
    })
    // Rejected case for fetchWishlist
    builder.addCase(fetchWishlist.rejected, (state, action) => {
      state.status = "error"
      state.error = action.payload.error
    })
    // Fulfilled case for addBookToWishListAsync
    builder.addCase(addBookToWishlistAsync.fulfilled, (state, action) => {
      state.wishlist.push(action.payload.savedBook);
    })
    // Fulfilled case for deleteBookFromWishlistAsync
  builder.addCase(deleteBookFromWishlistAsync.fulfilled, (state, action) => {
      state.wishlist = state.wishlist.filter(book => book._id === action.payload._id)
    })
  },
});


// Exporting the slice reducer
export default wishlistSlice.reducer
