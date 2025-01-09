import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk functions for categoriesSlice
export const fetchCategories = createAsyncThunk(
  "fetch/categories",
  async () => {
    const response = await axios.get(
      "https://bestseller-backend.vercel.app/categories"
    );

    return response.data;
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.status = "success";
      state.categories = action.payload.data.categories;
    });

    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.error;
    });
  },
});

export default categoriesSlice.reducer;
