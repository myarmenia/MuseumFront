import { createSlice } from '@reduxjs/toolkit';
import { getAuthUserAllMessages, postUserMessages} from './NewMessagesSliceApi';
const initialState = {
   loadingStatus: 'loading',
   modalIsOpen: false,
   dataMuseumMessages: [],
   statusPostUserMessages: null
};

const NewMessagesSlice = createSlice({
   name: 'NewMessages',
   initialState,
   reducers: {
      setIsOpen(state, { payload }) {
         state.modalIsOpen = payload;
      },
      setDataMuseumMessages(state, { payload }) {
         state.dataMuseumMessages = payload;
      },
   },
   extraReducers: (builder) => {
      builder
      // postMuseumPages===========================

      .addCase(getAuthUserAllMessages.pending, (state) => {
         state.loadingStatus = 'loading';
      })
      .addCase(getAuthUserAllMessages.fulfilled, (state, { payload }) => {
         state.loadingStatus = 'fulfilled';
         state.dataMuseumMessages = payload.data
      })
      .addCase(getAuthUserAllMessages.rejected, (state, action) => {
         state.loadingStatus = 'rejected';
         state.dataMuseum = [];
         state.filterDataMuseum = [];
      })

       // postUserMessages===========================

      .addCase(postUserMessages.pending, (state) => {
      })
      .addCase(postUserMessages.fulfilled, (state, { payload }) => {
         state.statusPostUserMessages = true
      })
      .addCase(postUserMessages.rejected, (state, action) => {
         state.statusPostUserMessages = null
      })
   },
});

export const NewMessagesReducer = NewMessagesSlice.reducer;
export const { setIsOpen, setDataMuseumMessages } = NewMessagesSlice.actions;
