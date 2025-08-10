import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";
import API from "../../api/apiConfig";

// Async thunks
export const listDestination = createAsyncThunk(
  "destination/listDestination",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(API.DESTINATION, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// get blog by ID
export const getDestinationById = createAsyncThunk(
  "destination/getDestinationById",
  async (destinationId, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(API.DESTINATION_BY_ID, {
        params: { DestinationId: destinationId },
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



const destinationSlice = createSlice({
  name: "DESTINATION",
  initialState: {
    destinations: [],
    selectedDestination: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listDestination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listDestination.fulfilled, (state, action) => {
        state.loading = false;
        state.destinations = action.payload?.response || [];
      })
      .addCase(listDestination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch accounts";
      })

      .addCase(getDestinationById.fulfilled, (state, action) => {
        state.selectedDestination = action.payload?.response || [];
        state.loading = false;
      })

    
  },
});

export default destinationSlice;
