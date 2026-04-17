import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios.js";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (queryParams = {}, thunkAPI) => {
    try {
      const queryString = new URLSearchParams(queryParams).toString();
      const { data } = await api.get(`/products?${queryString}`);
      console.log(data.data)
      return data.data; // depends on your backend response
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch products",
      );
    }
  },
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    product: null,

    loading: false,
    error: null,

    createSuccess: false,
    updateSuccess: false,
    deleteSuccess: false,

    pagination: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetCreate: (state) => {
      state.createSuccess = false;
    },
    resetUpdate: (state) => {
      state.updateSuccess = false;
    },
    resetDelete: (state) => {
      state.deleteSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.loading = true;
        state.error=null
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError,resetCreate,resetDelete,resetUpdate } = productSlice.actions;
export default productSlice.reducer;

