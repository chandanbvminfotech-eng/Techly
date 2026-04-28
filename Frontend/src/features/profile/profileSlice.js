import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/users/profile");
      // console.log(data);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch user profile",
      );
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (formData, thunkAPI) => {
    try {
      const { data } = await api.put("/users/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch update profile",
      );
    }
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProfile: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (building) => {
    building
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        //   console.log(action.payload)
        state.user = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Full user object with new avatar
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfile, clearError } = profileSlice.actions;

export default profileSlice.reducer;
