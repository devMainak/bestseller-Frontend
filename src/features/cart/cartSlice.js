import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk functions for cartSlice
export const fetchCart = createAsyncThunk("fetch/cart", async () => {
  const response = await axios.get(
    "https://bestseller-backend.vercel.app/cart"
  );

  return response.data;
});

export const addBookToCartAsync = createAsyncThunk("add/cart", async (book) => {
  const response = await axios.post(
    "https://bestseller-backend.vercel.app/cart",
    book
  );

  return response.data;
});

export const updateBookInCartAsync = createAsyncThunk(
  "update/cart",
  async ({ bookId, book }) => {
    const response = await axios.put(
      `https://bestseller-backend.vercel.app/cart/${bookId}`,
      book
    );

    return response.data;
  }
);

export const deleteBookFromCartAsync = createAsyncThunk(
  "delete/cart",
  async (bookId) => {
    const response = await axios.delete(
      `https://bestseller-backend.vercel.app/cart/${bookId}`
    );

    return response.data;
  }
);

export const clearBooksFromCartAsync = createAsyncThunk(
  "clear/cart",
  async () => {
    const response = await axios.delete(
      "https://bestseller-backend.vercel.app/cart/cart/clear"
    );

    return response.data;
  }
);

// Creating redux slice for cart
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchCart.fulfilled, (state, action) => {
      console.log(action.payload);
      state.status = "success";
      state.cart = action.payload.cart || [];
    });

    builder.addCase(fetchCart.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.error || "Failed to get books";
    });

    builder.addCase(addBookToCartAsync.fulfilled, (state, action) => {
      console.log(state.cart);
      state.cart.push(action.payload.savedBook);
    });

    builder.addCase(updateBookInCartAsync.fulfilled, (state, action) => {
      state.cart = state.cart.map((book) =>
        book._id === action.payload.updatedBook._id
          ? action.payload.updatedBook
          : book
      );
    });

    builder.addCase(deleteBookFromCartAsync.fulfilled, (state, action) => {
      state.cart = state.cart.filter(
        (book) => book._id !== action.payload.deletedBook._id
      );
    });

    builder.addCase(clearBooksFromCartAsync.fulfilled, (state) => {
      state.cart = [];
    });
  },
});

export default cartSlice.reducer;
