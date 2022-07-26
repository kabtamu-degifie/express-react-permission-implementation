import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setItem } from "../../libs/local-storage";

const initialState = {
  mode: "light",
};

export const setTheme = createAsyncThunk("theme/set", (theme) => {
  setItem("theme", theme);
  return theme;
});

const slice = createSlice({
  name: "theme",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(setTheme.fulfilled, (state, action) => {
      state.mode = action.payload;
    });
  },
});

export default slice.reducer;
