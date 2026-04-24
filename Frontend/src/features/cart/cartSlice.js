import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios.js";


export const addItemCart = createAsyncThunk(
  "cart/addItemCart",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const { data } = await api.post("/cart", { productId, quantity });
      // console.log(data)
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add item",
      );
    }
  },
);

export const getCartData = createAsyncThunk(
  "cart/getCartData",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/cart");
      // console.log(data);
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

export const deleteCart = createAsyncThunk("cart/deleteCart", async (_, thunkAPI) => {
  try {
    const data = await api.delete(`/cart`);
    return []
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to delete cart",
    );
  }
})

export const deleteSingleItemCart = createAsyncThunk("cart/deleteSingleItemCart",
  async ({productId}, thunkAPI) => {
    try {
      const {data} = await api.delete(`/cart/${productId}`);
      //  console.log(data.data);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete quantity",
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
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
      })
      .addCase(deleteCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSingleItemCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSingleItemCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(deleteSingleItemCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
