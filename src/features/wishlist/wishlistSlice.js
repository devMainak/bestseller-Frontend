import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk functions for wishlistSlice
export const fetchWishlist = createAsyncThunk("fetch/wishlist", async () => {
  const response = await axios.get(
    "https://bestseller-backend.vercel.app/wishlist"
  );

  return response.data;
});

export const addBookToWishlistAsync = createAsyncThunk(
  "add/wishlist",
  async (book) => {
    const response = await axios.post(
      "https://bestseller-backend.vercel.app/wishlist",
      book
    );

    return response.data;
  }
);

export const deleteBookFromWishlistAsync = createAsyncThunk(
  "delete/wishlist",
  async (bookId) => {
    const response = await axios.delete(
      `https://bestseller-backend.vercel.app/wishlist/${bookId}`
    );

    return response.data;
  }
);

// Initial state of redux slice for wishlist
export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWishlist.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchWishlist.fulfilled, (state, action) => {
      state.status = "success";
      state.wishlist = action.payload.wishlist || [];
    });

    builder.addCase(fetchWishlist.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.error;
    });

    builder.addCase(addBookToWishlistAsync.fulfilled, (state, action) => {
      state.wishlist.push(action.payload.savedBook);
    });

    builder.addCase(deleteBookFromWishlistAsync.fulfilled, (state, action) => {
      state.wishlist = state.wishlist.filter(
        (book) => book._id !== action.payload.deletedBook._id
      );
    });
  },
});

export default wishlistSlice.reducer;
