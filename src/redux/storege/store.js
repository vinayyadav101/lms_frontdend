import { configureStore } from "@reduxjs/toolkit";

import reducer from "../slices/allSlices";

export const store = configureStore({
    reducer:reducer
})