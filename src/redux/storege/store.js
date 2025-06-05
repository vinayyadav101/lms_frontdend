import { configureStore } from "@reduxjs/toolkit";

import authReduser from "../slices/authSlice";
import lectureReduser from '../slices/lectureSlice'
import rezorpayReduser from '../slices/rezorpaySlice'

export const store = configureStore({
    reducer:{
        auth : authReduser,
        payment : rezorpayReduser,
        lecture: lectureReduser
    }
})