import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk functions for addressSlice
export const fetchAddresses = createAsyncThunk("fetch/addresses", async () => {
  const response = await axios.get(
    "https://bestseller-backend.vercel.app/user/address"
  );

  return response.data;
});

export const addNewAddressAsync = createAsyncThunk(
  "add/address",
  async (address) => {
    const response = await axios.post(
      "https://bestseller-backend.vercel.app/user/address",
      address
    );

    return response.data;
  }
);

export const updateAddressAsync = createAsyncThunk(
  "update/address",
  async ({ addressId, address }) => {
    const response = await axios.put(
      `https://bestseller-backend.vercel.app/user/address/${addressId}`,
      address
    );

    return response.data;
  }
);

export const deleteAddressAsync = createAsyncThunk(
  "delete/address",
  async (addressId) => {
    const response = await axios.delete(
      `https://bestseller-backend.vercel.app/user/address/${addressId}`
    );

    return response.data;
  }
);

// Configuring address slice
export const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAddresses.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAddresses.fulfilled, (state, action) => {
      state.status = "success";
      state.addresses = action.payload ? action.payload : [];
    });
    builder.addCase(fetchAddresses.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload
        ? action.payload.address
        : "No address found";
    });
    builder.addCase(addNewAddressAsync.fulfilled, (state, action) => {
      state.addresses.push(action.payload.savedAddress);
    });
    builder.addCase(updateAddressAsync.fulfilled, (state, action) => {
      state.addresses = state.addresses.map((address) =>
        address._id === action.payload.updatedAddress._id
          ? action.payload.updatedAddress
          : address
      );
    });
    builder.addCase(deleteAddressAsync.fulfilled, (state, action) => {
      console.log(action.payload);
      state.addresses = state.addresses.filter(
        (address) => address._id !== action.payload.deletedAddress._id
      );
    });
  },
});

export default addressSlice.reducer;
