import { configureStore } from '@reduxjs/toolkit'
import dataToUpdateReducer from './features/feedback/dataUpdate/dataToUpdateSlice'

export const store = configureStore({
  reducer: {
    dataToUpdate: dataToUpdateReducer,
  },
})