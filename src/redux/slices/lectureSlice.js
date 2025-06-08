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

export const deleteLecture = createAsyncThunk('/courses/lecture/delete' , async({courseId , lectureId})=>{

    try {
        const response =  instance.delete(`/api/v1/course/delete/?courseId=${courseId}&&lectureId=${lectureId}`)

            toast.promise(response , {
                loading:"lecture is deleting wait!",
                success:"lecture delete sucess fully"
            })

            return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.message)
        throw error
    }
    
})
export const createCourseWithLecture = createAsyncThunk('/course/create',async(data)=>{
    try {
        const response =  instance.post('api/v1/course/createcourse' , data)

            toast.promise(response , {
                loading:"please wait course data are uploading!",
                success:"successfully course created."
            })
            return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.message)
        throw error
    }
})

export const deleteFullCourse = createAsyncThunk('/course/delete',async(id)=>{
    console.log(id);
    
    try {
        const response = instance.delete(`api/v1/course/delete/?courseId=${id}`)

            toast.promise(response , {
                loading:"course deleting in database please wait!",
                success:"course delete successfully."
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
            state.lectures = action?.payload?.data
        })
        builder.addCase(deleteFullCourse.fulfilled , (state)=>{
            if (state.lectures.length !== 0) {
                state.lectures = []
            }
        })
    })
})

export default lectureSlice.reducer