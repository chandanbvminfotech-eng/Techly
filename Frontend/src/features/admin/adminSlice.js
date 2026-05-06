import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Fetch Admin Stats
export const getAdminStats = createAsyncThunk(
  "admin/getStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/stats");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch stats",
      );
    }
  },
);

// Fetch All Users
export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async ({ page = 1, limit = 10, search = "" } = {}, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/admin/users?page=${page}&limit=${limit}&search=${search}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users",
      );
    }
  },
);

// Block User
export const blockUser = createAsyncThunk(
  "admin/blockUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/users/${userId}/block`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to block user",
      );
    }
  },
);

// Unblock User
export const unblockUser = createAsyncThunk(
  "admin/unblockUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/users/${userId}/unblock`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to unblock user",
      );
    }
  },
);

// Fetch Pending Sellers
export const getPendingSellers = createAsyncThunk(
  "admin/getPendingSellers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/sellers/pending");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch pending sellers",
      );
    }
  },
);

// Approve Seller
export const approveSeller = createAsyncThunk(
  "admin/approveSeller",
  async (sellerId, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/sellers/${sellerId}/approve`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to approve seller",
      );
    }
  },
);

// Reject Seller
export const rejectSeller = createAsyncThunk(
  "admin/rejectSeller",
  async (sellerId, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/sellers/${sellerId}/reject`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reject seller",
      );
    }
  },
);

// Fetch All Orders
export const getAllOrders = createAsyncThunk(
  "admin/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/orders");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders",
      );
    }
  },
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    stats: {
      totalUsers: 0,
      totalSellers: 0,
      totalOrders: 0,
      totalRevenue: 0,
      pendingSellerApprovals: 0,
    },
    users: [],
    pendingSellers: [],
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearAdminError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Stats
      .addCase(getAdminStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.data;
      })
      .addCase(getAdminStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data.users || action.payload.data;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Block User
      .addCase(blockUser.fulfilled, (state, action) => {
        const updatedUser = action.payload.data;
        const index = state.users.findIndex((u) => u._id === updatedUser._id);
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })

      // Unblock User
      .addCase(unblockUser.fulfilled, (state, action) => {
        const updatedUser = action.payload.data;
        const index = state.users.findIndex((u) => u._id === updatedUser._id);
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })

      // Get Pending Sellers
      .addCase(getPendingSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPendingSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingSellers = action.payload.data;
      })
      .addCase(getPendingSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Approve Seller
      .addCase(approveSeller.fulfilled, (state, action) => {
        const approvedSeller = action.payload.data;
        state.pendingSellers = state.pendingSellers.filter(
          (s) => s._id !== approvedSeller._id,
        );
        state.stats.pendingSellerApprovals = Math.max(
          0,
          state.stats.pendingSellerApprovals - 1,
        );
        state.stats.totalSellers += 1;

        // Also update in users list if present
        const userIndex = state.users.findIndex(
          (u) => u._id === approvedSeller._id,
        );
        if (userIndex !== -1) {
          state.users[userIndex] = approvedSeller;
        }
      })

      // Reject Seller
      .addCase(rejectSeller.fulfilled, (state, action) => {
        const rejectedSeller = action.payload.data;
        state.pendingSellers = state.pendingSellers.filter(
          (s) => s._id !== rejectedSeller._id,
        );
        state.stats.pendingSellerApprovals = Math.max(
          0,
          state.stats.pendingSellerApprovals - 1,
        );

        // Also update in users list if present
        const userIndex = state.users.findIndex(
          (u) => u._id === rejectedSeller._id,
        );
        if (userIndex !== -1) {
          state.users[userIndex] = rejectedSeller;
        }
      })

      // Get All Orders
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;
