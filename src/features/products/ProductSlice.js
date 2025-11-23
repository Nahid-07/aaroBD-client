import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import { toast } from "react-hot-toast";

// --- PUBLIC ACTIONS ---

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosClient.get("/products");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load products"
      );
    }
  }
);

// Fetch single product
export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosClient.get(`/products/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Create Review (User)
export const createReview = createAsyncThunk(
  "products/createReview",
  async ({ id, reviewData }, { rejectWithValue }) => {
    try {
      await axiosClient.post(`/products/${id}/reviews`, reviewData);
      toast.success("Review Submitted!");
      return id; // Return ID to trigger re-fetch
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// --- ADMIN ACTIONS ---

// Create Product (Admin)
export const createProduct = createAsyncThunk(
  "products/create",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post("/products", productData);
      toast.success("Product Added Successfully!");
      return res.data;
    } catch (error) {
      toast.error("Failed to create product");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Update Product (Admin)
export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const res = await axiosClient.put(`/products/${id}`, productData);
      toast.success("Product Updated Successfully!");
      return res.data;
    } catch (error) {
      toast.error("Failed to update product");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Delete Product (Admin)
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`/products/${id}`);
      toast.success("Product Deleted!");
      return id;
    } catch (error) {
      toast.error("Failed to delete product");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
    singleProduct: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Single
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Admin: Create
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Admin: Update
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) state.items[index] = action.payload;
        // Also update singleProduct if it's currently being viewed
        if (state.singleProduct?._id === action.payload._id) {
          state.singleProduct = action.payload;
        }
      })

      // Admin: Delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      })

      // Reviews
      .addCase(createReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReview.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createReview.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
