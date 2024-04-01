import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    personalDetails: [], // Define your initial state here
  };
export const personalDetails = createSlice({
  name: "personalDetails",
  initialState,
  reducers: {
    setpersonalDetails: (state, action) => {
      state.personalDetails.push(action.payload)
    },
  },
});

export const { setpersonalDetails } = personalDetails.actions;

export default personalDetails.reducer;