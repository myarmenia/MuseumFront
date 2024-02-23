import { createSlice } from "@reduxjs/toolkit";
import { postLogin } from "./LoginApi";

const initialState = {
   data: {
      authUser: {},
      access_token: '',
      isAuth: null,
      error: null
   },
   status: 'idle',
   error: null,
   authUser:false,
   loading: true,
   };

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
      
    },
 
   
 
    extraReducers: (builder) => {
       builder
          .addCase(postLogin.pending, (state) => {
             state.status = 'loading';
          })
          .addCase(postLogin.fulfilled, (state, action) => {
            state.data = action.payload
            state.data.isAuth = true
            state.loading = false
             state.status = 'succes';
          })
          .addCase(postLogin.rejected, (state, action) => {
             if(action.payload){
                state.data.error = action.payload
                state.data.isAuth = false
                
               }
               state.loading = false
               state.status = 'failed'; 
          });
    },
 });
 

export const selectLogin = (state) => state.login

export const selectLoginLoading = (state) => state.login.loading


 export const {} = loginSlice.actions


export const loginReducer =  loginSlice.reducer