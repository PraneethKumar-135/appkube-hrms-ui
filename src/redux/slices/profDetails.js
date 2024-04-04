'use client'
import { createSlice } from '@reduxjs/toolkit';

const initialState={
 

}


export const slice = createSlice({
  name: 'professionalDetails',
  initialState:initialState,
  reducers: {
    updateProfessionalDetails: (state, action) => {
      console.log(action.payload)
      return { ...state, ...action.payload };
    },
    setDropdownOption: (state, action) => {
      console.log(action.payload)
      state.selectedDepartment = action.payload;
    },
    setDropdownOptionDesig: (state, action) => {
      console.log(action.payload)
      state.selectedDesignation = action.payload;
    },
    setDropdownOptionReport: (state, action) => {
      console.log(action.payload)
      state.selectedReportingMngr = action.payload;
    },
    setDropdownOptionwork: (state, action) => {
      console.log(action.payload)
      state.selectedworkLocation = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    
   
  },
});

export const { updateProfessionalDetails,uanNumber,pfNumber,employeeId, setSelectedDate,setDropdownOption,addToDataArray,setDropdownOptionDesig,setDropdownOptionwork,setDropdownOptionReport } = slice.actions;

export const selectProfessionalDetails = (state) => state.professionalDetails;

export default slice.reducer;