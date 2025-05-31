import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import { instance } from "../../Helpers/axiosinstance";



const initialState = {
    isLogin : localStorage.getItem("isLogin") || false,
    role : localStorage.getItem("role") || "",
    data: localStorage.getItem('data')
            ? JSON.parse(localStorage.getItem("data"))
            : {}
}

const authHandler = (state , action)=>{
    
    const data = action?.payload?.data
    

            localStorage.setItem("isLogin" , true)
            localStorage.setItem("role", data?.role)
            localStorage.setItem("data", JSON.stringify(data))    

            state.data = data
            state.isLogin = true
            state.role = data?.role
            
}

const stateClearHandler = (state)=>{
            localStorage.clear()
            state.data={}
            state.isLogin=false
            state.role=""
        }
export const createAccount = createAsyncThunk('auth/signup' , async(data)=>{
    
    try {
        const response = instance.post('/api/v1/user/register' , data)

        toast.promise(response , {
            loading:"wait! , account creations is process.",
            success:"account sucessfully created.",
        })
            return (await response).data

    } catch (error) {
        toast.error(error?.response?.data?.message || error?.message)
        throw error
    }
})
export const login = createAsyncThunk('auth/login', async(data)=>{
    try {
        const response = instance.post('/api/v1/user/login',data)

            toast.promise(response , {
                loading:"wite for login!",
                success:"user sucessfully login.",
            })
             return (await response).data
    } catch (error) {   
        toast.error(error?.response?.data?.message || error?.message)
        throw error
    }
})

export const logout = createAsyncThunk('augth/logout',async()=>{
    try {
        const response = instance.get('/api/v1/user/logout')

            toast.promise(response,{
                loading:"logout process inisiat wait!",
                success:"user sucessfully logout",
            })

    } catch (error) {
        toast.error(error?.response?.data?.message || error?.message)
        throw error
    }
})


export const updateProfile = createAsyncThunk('auth/update',async({id , editProfile})=>{
    
    try {
        const response = instance.put(`/api/v1/user/update/${id}` , editProfile)
        toast.promise(response , {
            loading:"user data update is process.",
            success:"user update successfully.",
        })

        return (await response).data.success

    } catch (error) {
        toast.error(error?.response?.data?.message || error?.message)
        throw error   
    }
})

export const getProfile = createAsyncThunk('auth/get' , async(id)=>{
    try {
        const response = await instance.get(`/api/v1/user/getprofile/${id}`)

            return response?.data

    } catch (error) {
        toast.error(error?.response?.data?.message || error?.message)
        throw error
    }
})

 export const tokenVerify = createAsyncThunk('auth/token/verify',async()=> {
    try {
      
      await instance.get('/api/v1/user/token-verify')
      
    } catch (error) {
      toast.error(error.response.data.message)
      throw error
    }
  })

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(createAccount.fulfilled , authHandler)
        builder.addCase(login.fulfilled , authHandler)
        builder.addCase(getProfile.fulfilled , authHandler)
        builder.addCase(tokenVerify.rejected , stateClearHandler)
        builder.addCase(logout.fulfilled , stateClearHandler)
    }
})


export default authSlice.reducer