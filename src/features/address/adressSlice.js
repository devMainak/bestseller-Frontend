import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Async function to read all addresses
export const fetchAddresses = createAsyncThunk("fetch/addresses", async () => {
  const response = await axios.get("https://9dbaed3b-94c5-4327-8a1b-6921422f3eba-00-32qwd9xgzzr57.pike.replit.dev/user/address")

  return response.data
})

// Async function to add new address
export const addNewAddressAsync = createAsyncThunk("add/address", async (address) => {
  const response = await axios.post("https://9dbaed3b-94c5-4327-8a1b-6921422f3eba-00-32qwd9xgzzr57.pike.replit.dev/user/address", address)

  return response.data
})

// Async function to update existing address
export const updateAddressAsync = createAsyncThunk("update/address", async ({addressId, address}) => {
  const response = await axios.put(`https://9dbaed3b-94c5-4327-8a1b-6921422f3eba-00-32qwd9xgzzr57.pike.replit.dev/user/address/${addressId}`, address)

  return response.data
})

// Async function to delete an address
export const deleteAddressAsync = createAsyncThunk("delete/address", async (addressId) => {
  const response = await axios.delete(`https://9dbaed3b-94c5-4327-8a1b-6921422f3eba-00-32qwd9xgzzr57.pike.replit.dev/user/address/${addressId}`)

  return response.data
})

// Configuring address slice
export const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    // Pending case for fetchAddresses
    builder.addCase(fetchAddresses.pending, (state) => {
      state.status = "loading"
    })
    // Fulfilled case for fetchAddresses
    builder.addCase(fetchAddresses.fulfilled, (state, action) => {
      state.status = "success"
      state.addresses = action.payload
    })
    // Rejected case for fetchAddresses
    builder.addCase(fetchAddresses.rejected, (state, action) => {
      state.status = "error"
      state.error = action.payload.error
    })
    // Fulfilled case for addNewAddressAsync
    builder.addCase(addNewAddressAsync.fulfilled, (state, action) => {
      state.addresses.push(action.payload.savedAddress)
    })
    // Fulfilled case for updateAddressAsync
    builder.addCase(updateAddressAsync.fulfilled, (state, action) => {
      state.addresses = state.addresses.map(address => address._id === action.payload.updatedAddress._id ? action.payload.updatedAddress : address)
    })
    // Fulfilled case for deleteAddressAsync
    builder.addCase(deleteAddressAsync.fulfilled, (state, action) => {
      console.log(action.payload)
      state.addresses = state.addresses.filter(address => address._id !== action.payload.deletedAddress._id)
    })
  }
})

// Exporting the reducer
export default addressSlice.reducer