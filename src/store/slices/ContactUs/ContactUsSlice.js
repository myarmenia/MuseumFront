import { createSlice } from '@reduxjs/toolkit';
import { postContactUsData } from './ContactUsApi';

const initialState = {

};

export const ContactUsSlice = createSlice({
  name: 'contactus',
  initialState,
  reducers: {
    // setType: (state, action) => {
    //   state.types = action.payload;
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(postContactUsData.fulfilled, (state, action) => {
        console.log("ContactUsSlice -- fulfilled");
      })
      .addCase(postContactUsData.pending, (state, action) => {
        console.log('pending');
      })

      .addCase(postContactUsData.rejected, (state, action) => {
        console.log('chdarav');
      });
  },
});

// export const {
//   //   setErrorMessage,
// } = currentLessonSlice.actions;


export const getSingleNewsDate = (state) => state.newses.SingleNewsData;

export const ContactUsReducer = ContactUsSlice.reducer;