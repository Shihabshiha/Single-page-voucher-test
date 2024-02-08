import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  try {
    const response = await axios.get("http://5.189.180.8:8010/item");
    return response.data;
  } catch (err) {
    throw Error("Failed to fetch items from data base");
  }
});

const initialState = {
  items: [],
  detailData: [],
  loading: false,
  error: null,
};

const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    addRow: (state) => {
      state.detailData.push({
        itemCode: "",
        itemName: "",
        qty: null,
        rate: null,
      });
    },
    updateDetail: (state, action) => {
      const { index, field, value } = action.payload;
      state.detailData[index][field] = value;
    },
    clearData: (state) => {
      state.detailData = [];
    },
  },
  extraReducers: (bulider) => {
    bulider
      .addCase(fetchItems.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addRow, updateDetail, clearData } = detailSlice.actions;
export default detailSlice.reducer;
