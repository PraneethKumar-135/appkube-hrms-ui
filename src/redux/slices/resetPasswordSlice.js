import { createSlice } from "@reduxjs/toolkit";

const resetPassword = createSlice({
    name:"resetPassword",
    initialState:{
        email:"",
        otp:"",
        newPassword:""
    },
    reducers:{
        setEmail:(state,action)=>{
            state.email = action.payload
        },
        setOtp:(state,action)=>{
            state.otp = action.payload
        },
        setNewPass:(state,action)=>{
            state.newPassword = action.payload
        },

    }

})

export const {setEmail,setOtp,setNewPass} = resetPassword.actions

export default resetPassword.reducer;