import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

import { instance } from "../../Helpers/axiosinstance"
import { logout } from "./authSlice"

const initialState = {
    isSubscribe:false,
    rezorpay_key:"",
    plan_id:"",
    subscription_id :"",
}
const stateClear = (state)=>{
        state.isSubscribe = false,
        state.plan_id = "",
        state.rezorpay_key ="",
        state.subscription_id =""
}
export const getRezorpayKey = createAsyncThunk('/payment/key',async()=>{
    try {
        const response = await instance.get('/api/v1/payment/key')
            return response?.data
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.message)
        throw error
    }
})

export const buySubscription = createAsyncThunk('/payment/subscribe' , async()=>{
    try {
        const response = await instance.post(`/api/v1/payment/subscription`)
            return response?.data
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.message)
        throw error
    }
})

export const verifyPayment = createAsyncThunk('/payment/verify' , async(data)=>{
    try {
        const response = await instance.post('/api/v1/payment/verify', data)
            return response.data
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.message)
        throw error
    }
})

export const cancelSubscription = createAsyncThunk('/payment/subscription/cancel' , async (subscriptionID) => {

    console.log(subscriptionID);
    
    try {
        const response = instance.post('/api/v1/payment/cancel' , {subscriptionID})

        toast.promise(response , {
            loading:"wait for cancelation subscription.",
            success:"your subscription successfully canceled"
        })
            return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.message)
        throw error
    }
})

const rezorpaySlice = createSlice({
    name:'rezorpay',
    initialState,
    reducers:{
        clearState:stateClear
    },
    extraReducers:(builder) =>{
        builder.addCase(getRezorpayKey.fulfilled , (state , action)=>{
            state.rezorpay_key = action?.payload?.data
        })
        builder.addCase(buySubscription.fulfilled , (state , action) =>{
            state.subscription_id = action?.payload?.data?.id
        })
        builder.addCase(verifyPayment.fulfilled , (state)=>{
            state.isSubscribe = true
        })
        builder.addCase(verifyPayment.rejected , (state)=>{
            state.isSubscribe = false
        })
        builder.addCase(cancelSubscription.fulfilled , stateClear)
        builder.addCase(logout.fulfilled ,stateClear)
    }
})

export const {clearState} = rezorpaySlice.actions
export default rezorpaySlice.reducer