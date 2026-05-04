import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const getSellerProducts = createAsyncThunk(
  "seller/getSellerProducts",
  async (queryParams = {}, thunkAPI) => {
    try {
      const queryString = new URLSearchParams(queryParams).toString();
      const result = await api.get(`/seller/products?${queryString}`);
      console.log("Seller products fetched:", result?.data);
      return result?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch seller products",
      );
    }
  },
);

export const addProduct = createAsyncThunk(
  "seller/addProduct",
  async (formData, thunkAPI) => {
    try {
      const result = await api.post("/products", formData);
      return result?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add product",
      );
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "seller/deleteProduct",
  async (productId, thunkAPI) => {
    try {
      const result = await api.delete(`/products/${productId}`);
      return productId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add product",
      );
    }
  },
);

const sellerSlice = createSlice({
  name: "seller",
  initialState: {
    products: [],
    orders: [],
    error: null,
    loading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSellerProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSellerProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getSellerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.products = [
          ...(state.products.products || []),
          action.payload,
        ];
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products.products = state.products.products.filter(
          (p) => p._id !== action.payload,
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = sellerSlice.actions;
export default sellerSlice.reducer;
