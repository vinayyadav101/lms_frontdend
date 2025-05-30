import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

import { instance } from "../../Helpers/axiosinstance"

const initialState = {
    rezorpay_key:"",
    plan_id:"",
    subscription_id :"",
}

export const getRezorpayKey = createAsyncThunk('/payment/key',async()=>{
    try {
        const response = await instance.get('/api/v1/payment/key')
            return response?.data
    } catch (error) {
        toast.error(error?.message)
    }
})

export const buySubscription = createAsyncThunk('/payment/subscribe' , async()=>{
    try {
        const response = await instance.post(`/api/v1/payment/subscription`)
            return response?.data
    } catch (error) {
        toast.error(error?.message)
    }
})

export const verifyPayment = createAsyncThunk('/payment/verify' , async(data)=>{
    try {
        const response = await instance.post('/api/v1/payment/verify', data)
            return response?.data
    } catch (error) {
       toast.error(error?.message) 
    }
})

const rezorpaySlice = createSlice({
    name:'rezorpay',
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder.addCase(getRezorpayKey.fulfilled , (state , action)=>{
            state.rezorpay_key = action?.payload?.data
        })
        builder.addCase(buySubscription.fulfilled , (state , action) =>{
            state.subscription_id = action?.payload?.data?.id
        })
    }
})


export default rezorpaySlice.reducer