import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


// function to fetch books data
export const fetchBooks = createAsyncThunk("fetch/books", async () => {
  const response = await axios.get("https://9dbaed3b-94c5-4327-8a1b-6921422f3eba-00-32qwd9xgzzr57.pike.replit.dev/books")
  
  return response.data
})

// This is the state slice for books
export const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    status: "idle",
    error: null,
    categoryFilter: [],
    priceSlider: 100,
    sortByRating: 6,
    categories: [
        {
          name: "Fiction",
          checked: false
        },
        {
          name: "Non-Fiction",
          checked: false
        },
        {
          name: "Business",
          checked: false
        },
        {
          name: "Psychology",
          checked: false
        },
        {
          name: "Self-Help",
          checked: false
        }
      ]
  },
  reducers: {
    // For adding new category to the filter array
    addToCategoryFilter: (state, action) => {
      state.categoryFilter = [...state.categoryFilter, action.payload]
      state.categories = state.categories.map(category => {
        if (category.name === action.payload){
          category.checked = true
          return category
        }
        return category
      })
    },
    // For removing category from the filter array
    removeFromCategoryFilter: (state, action) => {
      state.categoryFilter = state.categoryFilter.filter(category => category !== action.payload)
      state.categories = state.categories.map(category => {
        if (category.name === action.payload){
          category.checked = false
          return category
        }
        return category
      })
    },
    // Setting the priceSlider value
    setPriceSlider: (state, action) => {
      state.priceSlider = action.payload
    },
    // Setting the sortByRating value
    setSortByRating: (state, action) => {
      state.sortByRating = action.value
    },
    // clear all filters and reset
    clearFilters: (state) => {
      state.categoryFilter = []
      state.priceSlider = 100
      state.sortByRating = 6
      state.categories = state.categories.map(category => {
        category.checked = false
        return category
      })
    }
  },
  extraReducers: (builder) => {
    //case for pending status of the response
    builder.addCase(fetchBooks.pending, (state) => {
      state.status = "loading"
    })

    //case for success status of the response
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.status = "success"
      state.books = action.payload
    })
    
    //case for rejected status of the response
    builder.addCase(fetchBooks.rejected, (state, action) => {
     state.status = "error"
     state.error = action.message
    })
  }
})

// 
export const { addToCategoryFilter, removeFromCategoryFilter, setPriceSlider, setSortByRating, clearFilters} = booksSlice.actions

// exporting the reducer for the store
export default booksSlice.reducer