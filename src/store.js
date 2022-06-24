import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './options/themeSlice'

export default configureStore({
  reducer: {
    counter: themeReducer,
  },
})