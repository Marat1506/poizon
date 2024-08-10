import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    errors: 0,

}

export const poizonSlice = createSlice({
    name: 'poizon',
    initialState,
    reducers: {

        gg: () => {
        }
    }
})

export const {gg} = poizonSlice.actions
export default poizonSlice.reducer