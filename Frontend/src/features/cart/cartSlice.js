import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios.js";

export const getCartData = createAsyncThunk(
  "cart/getCartData",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/cart");
      console.log(data);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart data",
      );
    }
  },
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const { data } = await api.put(`/cart/${productId}`, {
        quantity,
      });

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update quantity",
      );
    }
  },
);

export const addItemCart = createAsyncThunk(
  "/cart/addItemCart",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const { data } = await api.post("/cart", { productId, quantity });
      console.log(data)
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add item",
      );
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = null;
      state.error=null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartData.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(getCartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addItemCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addItemCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
