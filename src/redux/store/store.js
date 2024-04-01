// any store// any store
"use client";
import { configureStore } from "@reduxjs/toolkit";
import professionalDetails from "../slices/profDetails";
import personalDetails from "../slices/personalDetails";
import Onboardingpersdetails from "../slices/Onboardingpersdetails";
import EquipmentDetails from "../slices/Equipment";

import formSlice from "../slices/Details";

import resetPasswordSlice from "../slices/resetPasswordSlice";
import DetailSlice from "../slices/Details";


export const store = configureStore({
  reducer: {
    professionalDetails: professionalDetails,
    formDetails: formSlice,
    personalDetails: personalDetails,
    resetPassword: resetPasswordSlice,
    Onboardingpersdetails: Onboardingpersdetails,
    EquipmentDetails: EquipmentDetails,
    DetailSlice: DetailSlice,
  },
});
