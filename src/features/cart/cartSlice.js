import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Async function to read books in cart
export const fetchCart = createAsyncThunk("fetch/cart", async () => {
  const response = await axios.get("https://9dbaed3b-94c5-4327-8a1b-6921422f3eba-00-32qwd9xgzzr57.pike.replit.dev/cart")

  return response.data
})

// Async function to add to book to cart
export const addBookToCartAsync = createAsyncThunk("add/cart", async (book) => {
  const response = await axios.post("https://9dbaed3b-94c5-4327-8a1b-6921422f3eba-00-32qwd9xgzzr57.pike.replit.dev/cart", book)

  return response.data
})

// Async function to update book in cart
export const updateBookInCartAsync = createAsyncThunk("update/cart", async ({bookId, book}) => {
  const response = await axios.put(`https://9dbaed3b-94c5-4327-8a1b-6921422f3eba-00-32qwd9xgzzr57.pike.replit.dev/cart/${bookId}`, book)

  return response.data
})

// Async function to delete book from cart
export const deleteBookFromCartAsync = createAsyncThunk("delete/cart", async (bookId) => {
  const response = await axios.post("https://9dbaed3b-94c5-4327-8a1b-6921422f3eba-00-32qwd9xgzzr57.pike.replit.dev/cart", bookId)

  return response.data
})

// Creating redux slice for cart
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    // Case for pending status of fetchCart
    builder.addCase(fetchCart.pending, (state) => {
      state.status = "loading"
    })
    // Case for fulfilled status of fetchCart
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.status = "success"
      state.cart = action.payload
    })
    // Case for rejected status of fetchCart
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.status = "error"
      state.error = action.payload.error
    })
    // Case for fulfilled case of addBookToCartAsync
    builder.addCase(addBookToCartAsync.fulfilled, (state, action) => {
      state.cart.push(action.payload.savedBook)
    })
    // Case for fulfilled case of updateBookInCartAsync
    builder.addCase(updateBookInCartAsync.fulfilled, (state, action) => {
      state.cart = state.cart.map(book => book._id === action.payload.updatedBook._id ? action.payload.updatedBook : book)
    })
    // Case for fulfilled case of deleteBookFromCartAsync
    builder.addCase(deleteBookFromCartAsync.fulfilled, (state, action) => {
      state.cart = state.cart.filter(book => book._id !== action.payload.deletedBook._id)
    })
  }
})

// Exporting the cartSlice reducer
export default cartSlice.reducer