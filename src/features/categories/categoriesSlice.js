import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Async function to fetch categories
export const fetchCategories = createAsyncThunk("fetch/categories", async () => {
  const response = await axios.get("https://9dbaed3b-94c5-4327-8a1b-6921422f3eba-00-32qwd9xgzzr57.pike.replit.dev/categories")

  return response.data
})

// configuring the slice for categories
export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    // Case for pending status for the request
    builder.addCase(fetchCategories.pending, (state) => {
      state.status = "loading"
    })
    // Case for success status for the request
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.status = "success"
      state.categories = action.payload.data.categories
    })
    // Case for rejected status for the request
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.status = "error"
      state.error = action.payload.error
    })
  }
})

// exporting the reducer for the store
export default categoriesSlice.reducer