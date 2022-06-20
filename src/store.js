import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './Options/themeSlice'

export default configureStore({
  reducer: {
    counter: themeReducer,
  },
})