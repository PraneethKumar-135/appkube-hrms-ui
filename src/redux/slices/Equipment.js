"use client";
import { createSlice } from "@reduxjs/toolkit"
import { data } from "autoprefixer";
const EquipmentDetails = createSlice({
    name: "EquipmentDetails",
    initialState: {
        Device: {},
        "organization": [],
        "editdata": []
    },
    reducers: {
        AddEquipment: (state, action) => {
            const data = action.payload
            state.organization.push(data)
        },
        deleteequipement: (state, action) => {
            state.organization = state.organization.filter(id => id.SerialNumber !== action.payload)
        },
        editdata: (state, action) => {
            state.editdata.push
        }
    }
})

export const { AddEquipment, deleteequipement } = EquipmentDetails.actions;
export default EquipmentDetails.reducer;