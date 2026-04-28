import { createSlice } from "@reduxjs/toolkit";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/api/addresses"; // Adjust based on your backend route

// Get all addresses for logged-in user
export const fetchAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// Create new address
export const createAddress = createAsyncThunk(
  "address/createAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, addressData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// Update address
export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ id, addressData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, addressData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// Delete address
export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// Set default address
export const setDefaultAddress = createAsyncThunk(
  "address/setDefaultAddress",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}/default`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearAddressError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch addresses
      .addCase(fetchAddresses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Create address
      .addCase(createAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses.push(action.payload);
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update address
      .addCase(updateAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.addresses.findIndex(
          (addr) => addr._id === action.payload._id,
        );
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete address
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses = state.addresses.filter(
          (addr) => addr._id !== action.payload,
        );
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Set default address
      .addCase(setDefaultAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(setDefaultAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update isDefault status for all addresses
        state.addresses = state.addresses.map((addr) => ({
          ...addr,
          isDefault: addr._id === action.payload._id,
        }));
      })
      .addCase(setDefaultAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAddressError } = addressSlice.actions;
export default addressSlice.reducer;