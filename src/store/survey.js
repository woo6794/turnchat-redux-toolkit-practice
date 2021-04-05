import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  title: "",
  description: "",
};

const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    updateTitle(state, action) {
      state.title = action.payload;
    },
    updateDescription(state, action) {
      state.description = action.payload;
    },
  },
});

export const { updateTitle, updateDescription } = surveySlice.actions;
export default surveySlice.reducer;
