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
    error: null
  },
  reducers: {},
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

// exporting the reducer for the store
export default booksSlice.reducer