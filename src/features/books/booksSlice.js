import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk functions for booksSlice
export const fetchBooks = createAsyncThunk("fetch/books", async () => {
  const response = await axios.get(
    "https://bestseller-backend.vercel.app/books"
  );

  return response.data;
});

// intial state for books
export const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    status: "idle",
    error: null,
    categoryFilter: [],
    priceSlider: 100,
    sortByRating: 6,
    sortByPrice: "HighToLow",
    categories: [
      {
        name: "Fiction",
        checked: false,
      },
      {
        name: "Non-Fiction",
        checked: false,
      },
      {
        name: "Business",
        checked: false,
      },
      {
        name: "Psychology",
        checked: false,
      },
      {
        name: "Self-Help",
        checked: false,
      },
    ],
  },
  reducers: {
    // For adding new category to the filter array
    addToCategoryFilter: (state, action) => {
      state.categoryFilter = [...state.categoryFilter, action.payload];
      state.categories = state.categories.map((category) => {
        if (category.name === action.payload) {
          category.checked = true;
          return category;
        }
        return category;
      });
    },
    // For removing category from the filter array
    removeFromCategoryFilter: (state, action) => {
      state.categoryFilter = state.categoryFilter.filter(
        (category) => category !== action.payload
      );
      state.categories = state.categories.map((category) => {
        if (category.name === action.payload) {
          category.checked = false;
          return category;
        }
        return category;
      });
    },
    // Setting the priceSlider value
    setPriceSlider: (state, action) => {
      state.priceSlider = action.payload;
    },
    // Setting the sortByRating value
    setSortByRating: (state, action) => {
      state.sortByRating = action.payload;
    },
    // Setting the sort by method
    setSortByPrice: (state, action) => {
      state.sortByPrice = action.payload;
    },
    // clear all filters and reset
    clearFilters: (state) => {
      state.categoryFilter = [];
      state.priceSlider = 100;
      state.sortByRating = 6;
      state.sortByPrice = "HighToLow";
      state.categories = state.categories.map((category) => {
        category.checked = false;
        return category;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.status = "success";
      state.books = action.payload.data.books;
    });

    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.error;
    });
  },
});

export const {
  addToCategoryFilter,
  removeFromCategoryFilter,
  setPriceSlider,
  setSortByRating,
  setSortByPrice,
  clearFilters,
} = booksSlice.actions;

export default booksSlice.reducer;
