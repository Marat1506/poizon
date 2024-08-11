import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    errors: 0,
    time: 60,
    KS: 0,
    KSM: 0,
    charIndex: 0,
    isTyping: false,
    correctWrong: []
}

export const poizonSlice = createSlice({
    name: 'poizon',
    initialState,
    reducers: {
        setErrors: (state, action) => {
            state.errors = action.payload;
        },
        setTime: (state, action) => {
            state.time = action.payload;
        },
        setKS: (state, action) => {
            state.KS = action.payload;
        },
        setKSM: (state, action) => {
            state.KSM = action.payload;
        },
        setCharIndex: (state, action) => {
            state.charIndex = action.payload;
        },
        setIsTyping: (state, action) => {
            state.isTyping = action.payload;
        },
        setCorrectWrong: (state, action) => {
            state.correctWrong = action.payload;
        },
        resetGame: (state) => {
            state.errors = 0;
            state.time = 60;
            state.KS = 0;
            state.KSM = 0;
            state.charIndex = 0;
            state.isTyping = false;
            state.correctWrong = Array(state.correctWrong.length).fill('');
        }
    }
})

export const {
    setErrors,
    setTime,
    setKS,
    setKSM,
    setCharIndex,
    setIsTyping,
    setCorrectWrong,
    resetGame
} = poizonSlice.actions;

export default poizonSlice.reducer;
