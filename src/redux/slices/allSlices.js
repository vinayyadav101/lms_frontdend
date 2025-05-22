import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import { instance } from "../../Helpers/axiosinstance";

const initialState = {
    isLogin : localStorage.getItem('isLogin') || false,
    role : localStorage.getItem("role") || "",
    data: localStorage.getItem('data') || {}
}

const authHandler = (state , action)=>{
    
    const data = action?.payload?.data

            localStorage.setItem("isLogin" , true)
            localStorage.setItem("role", JSON.stringify(data.role))
            localStorage.setItem("data",JSON.stringify(data))    

            state.data = data
            state.isLogin = true
            state.role = data?.role
            
}
export const createAccount = createAsyncThunk('autgh/singup' , async(data)=>{
    
    try {
        const response = instance.post('/api/v1/user/register' , data)

        toast.promise(response , {
            loading:"wait! , account creations is process.",
            success:"account sucessfully created.",
            error:response?.data?.message
        })
            return (await response).data

    } catch (error) {
        toast.error(error.message)
    }
})
export const login = createAsyncThunk('auth/login', async(data)=>{
    try {
        const response = instance.post('/api/v1/user/login',data)

            toast.promise(response , {
                loading:"wite for login!",
                success:"user sucessfully login.",
                error:response?.data?.message
            })
            return (await response).data
    } catch (error) {
        toast.error(error.message)
    }
})

export const logout = createAsyncThunk('augth/logout',async()=>{
    try {
        const response = instance.get('/api/v1/user/logout')

            toast.promise(response,{
                loading:"logout process inisiat wait!",
                success:"user sucessfully logout",
                error:response?.data?.message
            })

    } catch (error) {
        toast.error(error.message)
    }
})

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(createAccount.fulfilled , authHandler)
        builder.addCase(login.fulfilled , authHandler)
        builder.addCase(logout.fulfilled , (state)=>{
            localStorage.clear()
            state.data={}
            state.isLogin=false
            state.role=""
        })
    }
})


export const {} = authSlice.actions
export default authSlice.reducer