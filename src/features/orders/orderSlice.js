import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import { toast } from "react-hot-toast";

export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosClient.get("/orders");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// Update Order Status (Admin)
export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      // Note: You need to create this PUT route in your backend later!
      const res = await axiosClient.put(`/orders/${id}`, { status });
      toast.success(`Order marked as ${status}`);
      return res.data;
    } catch (err) {
      toast.error("Failed to update status");
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      // Update local state immediately after successful API call
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex(o => o._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      });
  },
});

export default orderSlice.reducer;