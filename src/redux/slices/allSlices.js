import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin : localStorage.getItem('islogin') || false,
    role : localStorage.getItem("role") || "",
    data: localStorage.getItem('data') || {}
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{}
})


export const {} = authSlice.actions
export default authSlice.reducer