import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../../axios';

export const postAuthUserMessages = createAsyncThunk(
   'NewMessages/postAuthUserMessages',

   async (body, thunkAPI) => {
      try {
         const config = {
            method: 'post',
            url: 'chat/add-message',
            data: body,
         };

         const response = await instance(config);
         console.log(response, 'responseeeee');

         //  return response?.data;
      } catch (error) {
         console.log(error, 'error');
         return thunkAPI.rejectWithValue(error.response.data.error.both);
      }
   },
);
export const postNotUserMessages = createAsyncThunk(
   'NewMessages/postNotUserMessages',

   async (body, thunkAPI) => {
      try {
         const config = {
            method: 'post',
            url: 'chat/add-message',
            data: body,
         };

         const response = await instance(config);
         console.log(response, 'responseeeee');

         //  return response?.data;
      } catch (error) {
         console.log(error, 'error');
         return thunkAPI.rejectWithValue(error.response.data.error.both);
      }
   },
);