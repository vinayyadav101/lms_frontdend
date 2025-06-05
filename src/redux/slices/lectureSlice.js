import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import { instance } from "../../Helpers/axiosinstance";

const initialState = {
    lectures:[]
}

export const getLectureAll = createAsyncThunk('/coures/lecture/get', async (id) => {
    
    try {
        const response = instance.get(`api/v1/course/${id}`)
            toast.promise(response , {
                loading:"wait for fetch lectures",
                success:"lectures facthed data sucessfully."
            })

            return (await response).data

    } catch (error) {
        toast.error(error?.response?.data?.message || error?.message)
        throw error
    }
})



const lectureSlice = createSlice({
    name:"lecture",
    initialState,
    reducers:{},
    extraReducers:(builder =>{
        builder.addCase(getLectureAll.fulfilled , (state , action)=>{
            console.log(action);
            
            state.lectures = action?.payload?.data
        })
    })
})

export default lectureSlice.reducer