import { configureStore } from "@reduxjs/toolkit";

import authReduser from "../slices/allSlices";

export const store = configureStore({
    reducer:{
        auth : authReduser
    }
})