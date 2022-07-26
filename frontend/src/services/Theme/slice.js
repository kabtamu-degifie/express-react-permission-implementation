import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
};

export const setTheme = createAsyncThunk("theme/set", (theme) => {});

const slice = createSlice({
  name: "theme",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(setTheme.fulfilled, (state) => {});
  },
});

export default slice.reducer;
