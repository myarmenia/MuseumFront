import { createSlice } from "@reduxjs/toolkit";
import { getPrivateTicket } from "./PrivateTicketApi";

const initialState = {
   data: [],
   status: 'idle',
   loading: 'pending',
   params: {}
   };

const privateTicketSlice = createSlice({
    name: 'privateTicket',
    initialState,
    reducers: {
      
    },
 
   
 
    extraReducers: (builder) => {
       builder
          .addCase(getPrivateTicket.pending, (state) => {
             state.status = 'loading';
          })
          .addCase(getPrivateTicket.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.params = action.payload.params
            state.loading = 'fulfilled'
             state.status = 'succes';
          })
          .addCase(getPrivateTicket.rejected, (state, action) => {
             if(action.payload){
                state.data.error = action.payload
               }
               state.loading = 'rejected'
               state.status = 'failed'; 
          });
    },
 });
 

export const selectprivateTicket = (state) => state.privateTicket

export const selectPrivateTicketLoading = (state) => state.privateTicket.loading


 export const {} = privateTicketSlice.actions


export const privateTicketReducer =  privateTicketSlice.reducer