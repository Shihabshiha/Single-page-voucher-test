import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const saveDataToDatabase = createAsyncThunk(
  "data/saveDataToDatabase",
  async (dataToSend, { rejectWithValue }) => {
    try {
      const response = axios.post(
        "http://5.189.180.8:8010/header/multiple",
        dataToSend
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to save data to database");
    }
  }
);

const initialState = {
  headerData: {
    vrNo: "",
    vrDate: "",
    status: "",
    acName: "",
    acAmt: 0,
  },
  loading: false,
  error: null,
  savedData: [],
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setVrNo: (state, action) => {
      state.headerData.vrNo = action.payload;
    },
    setVrDate: (state, action) => {
      state.headerData.vrDate = action.payload;
    },
    setStatus: (state, action) => {
      state.headerData.status = action.payload;
    },
    setAcName: (state, action) => {
      state.headerData = { ...state.headerData, acName: action.payload };
    },
    setTotalAmt: (state, action) => {
      state.headerData.acAmt = action.payload;
    },
    clearHeader: (state) => {
      state.headerData = { ...initialState.headerData };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveDataToDatabase.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(saveDataToDatabase.fulfilled, (state, action) => {
        state.loading = false;
        state.savedData = action.payload;
      })
      .addCase(saveDataToDatabase.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const {
  setVrNo,
  setVrDate,
  setAcName,
  setStatus,
  setTotalAmt,
  clearHeader,
} = headerSlice.actions;
export default headerSlice.reducer;
