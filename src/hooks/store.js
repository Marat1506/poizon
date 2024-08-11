import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";


export const store = configureStore({
    reducer: {
        poizon: reducer,
    }
})

export default store