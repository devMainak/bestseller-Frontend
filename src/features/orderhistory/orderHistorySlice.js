import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Order Slice Thunk functions
export const fetchOrderAsync = createAsyncThunk("fetch/order", async () => {
  const response = await axios.get(
    "https://bestseller-backend.vercel.app/orders"
  );

  return response.data;
});

export const saveOrderAsync = createAsyncThunk("save/orders", async (order) => {
  const response = await axios.post(
    "https://bestseller-backend.vercel.app/orders",
    order
  );

  return response.data;
});

export const updateOrderAsync = createAsyncThunk(
  "update/orders",
  async ({ orderId, order }) => {
    console.log(order);
    const response = await axios.post(
      `https://bestseller-backend.vercel.app/orders/${orderId}`,
      order
    );

    return response.data;
  }
);

export const deleteOrderAsync = createAsyncThunk(
  "delete/orders",
  async (orderId) => {
    const response = await axios.delete(
      `https://bestseller-backend.vercel.app/orders/${orderId}`
    );

    return response.data;
  }
);

// Intial stete of orderSlice
export const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrderAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchOrderAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.order = action.payload ? action.payload.orders[0] : {};
    });

    builder.addCase(fetchOrderAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload
        ? action.payload.error
        : "Failed to fetch order";
    });

    builder.addCase(saveOrderAsync.fulfilled, (state, action) => {
      state.order = action.payload.savedOrder;
    });

    builder.addCase(updateOrderAsync.fulfilled, (state, action) => {
      state.order = action.payload.updatedOrder;
    });

    builder.addCase(deleteOrderAsync.fulfilled, (state, action) => {
      state.order = null;
    });
  },
});

export default orderSlice.reducer;
