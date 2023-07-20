import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userSlice'
import todoReducer from './reducers/todoSlice'

export const Store = configureStore({
  reducer: {
    user: userReducer,
    todo: todoReducer
  }
})
