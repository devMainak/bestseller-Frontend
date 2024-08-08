import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Creating redux slice for cart
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    status: "idle",
    error: null
  },
  reducers: {}
})

// Exporting the cartSlice reducer
export default cartSlice.reducer