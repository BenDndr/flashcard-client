'use client'
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: "",
    authState: false
  },
  reducers: {
    login: (state, action) => {
      state.authState = true
      state.username = action.payload
    },
    logout: (state) => {
      state.authState = false
      state.username = ""
    }
  },
})


export const {login, logout} = authSlice.actions

export default authSlice
