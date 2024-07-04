import React from 'react'
import { createSlice } from '@reduxjs/toolkit';

export const dataToUpdateSlice = createSlice({
  name: 'dataToUpdate',
  initialState: {
    value: {},
  },
  reducers: {
    setDataToUpdate: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setDataToUpdate } = dataToUpdateSlice.actions;

export default dataToUpdateSlice.reducer