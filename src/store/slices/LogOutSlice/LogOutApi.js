import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";

export const getLogOut = createAsyncThunk(
  'logOut/getLogOut',
  async (_, thunkAPI) => {
    const leng = localStorage.getItem('lang')

      try {
        const config = {
          method: "get",
          url: 'auth/logout',
        };
        
        const response = await instance(config);
        // window.location.pathname = `/${leng}/login`  
        return response?.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error.both);
      }
    }
)