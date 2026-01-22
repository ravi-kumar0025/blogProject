import { configureStore } from "@reduxjs/toolkit";
import authReducer, { login } from "./slice";

const store =configureStore({
    reducer: {
        authReducer,
    },
});

export default store;