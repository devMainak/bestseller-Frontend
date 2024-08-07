import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Async action creator function to add book to wishlist
export const addBookToWishlistAsync = async (book) => {
  const response = await axios.post("https://9dbaed3b-94c5-4327-8a1b-6921422f3eba-00-32qwd9xgzzr57.pike.replit.dev/wishlist", book)

  return response.data
}

// Async action creator function to delete book from wishlist
export const deleteBookFromWishlistAsync = async (bookId) => {
  const response = await axios.delete(`https://9dbaed3b-94c5-4327-8a1b-6921422f3eba-00-32qwd9xgzzr57.pike.replit.dev/wishlist/${bookId}`)

  return response.data
}

// Creating redux slice for wishlist 
export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    
  }
})