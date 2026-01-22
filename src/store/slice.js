import { createSlice } from "@reduxjs/toolkit";
import store from "./store";
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";

const initialState={
    status:false,
    userData:null,
}

const s=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login(state,action){
            state.status=true,
            state.userData=action.payload.userData
        },
        logout(state){
            state.status=false;
        }
    }
})

export const {login,logout}=s.actions;
export default s.reducer;