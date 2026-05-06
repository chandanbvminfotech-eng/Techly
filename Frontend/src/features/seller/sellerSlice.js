import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const getSellerProducts = createAsyncThunk(
  "seller/getSellerProducts",
  async (queryParams = {}, thunkAPI) => {
    try {
      const queryString = new URLSearchParams(queryParams).toString();
      const result = await api.get(`/seller/products?${queryString}`);
      // console.log("Seller products fetched:", result?.data);
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
        error.response?.data?.message || "Failed to delete product",
      );
    }
  },
);

export const updateProduct = createAsyncThunk(
  "seller/updateProduct",
  async ({ formData, productId }, thunkAPI) => {
    try {
      const { data } = await api.put(`/products/${productId}`, formData);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update product",
      );
    }
  },
);

export const getSellerProductById = createAsyncThunk(
  "seller/getSellerProductById",
  async (productId, thunkAPI) => {
    try {
      const { data } = await api.get(`/products/${productId}`);
      return data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch seller product",
      );
    }
  },
);

export const getSellerOrders = createAsyncThunk(
  "seller/getSellerOrders",
  async (__, thunkAPI) => {
    try {
      const data = await api.get("/seller/orders");
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch seller orders",
      );
    }
  },
);

export const updateOrderStatus = createAsyncThunk(
  "seller/updateOrderStatus",
  async ({ status, orderId }, thunkAPI) => {
    try {
      const data = await api.put(`/seller/orders/${orderId}/status`, {
        status,
      });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update order status",
      );
    }
  },
);

export const getSellerStats = createAsyncThunk(
  "seller/getSellerStats",
  async (_, thunkAPI) => {
    try {
      const data = await api.get("/seller/stats");
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to get seller stats",
      );
    }
  },
);

const sellerSlice = createSlice({
  name: "seller",
  initialState: {
    products: [],
    orders: [],
    stats:null,
    error: null,
    loading: false,
    currentProduct: null,
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
        state.loading = false;
        state.products.data.products = state.products.data.products.filter(
          (p) => p._id !== action.payload,
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (state.products.data?.products) {
          const index = state.products.data.products.findIndex(
            (p) => p._id === action.payload._id,
          );
          if (index !== -1)
            state.products.data.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSellerProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSellerProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(getSellerProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSellerOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSellerOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getSellerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }) 
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        if (state.orders.data) {
          const index = state.orders.data.findIndex(
            (o) => o.orderId?._id === action.payload.data._id,
          );
          if (index !== -1)
            state.orders.data[index].orderId.status =
              action.payload.data.status;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getSellerStats
      .addCase(getSellerStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSellerStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(getSellerStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = sellerSlice.actions;
export default sellerSlice.reducer;
