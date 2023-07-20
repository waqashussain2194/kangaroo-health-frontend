import { createSlice } from '@reduxjs/toolkit'
import { createTodo, deleteTodo } from '../actions/todo'

const initialState = {
  loading: false,
  todo: null,
  error: null,
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: {
    // create todo
    [createTodo.pending.toString()]: (state: any) => {
      state.loading = true
      state.error = null
    },
    [createTodo.fulfilled.toString()]: (state: any, { payload }: any) => {
      state.loading = false
      state.todo = payload
    },
    [createTodo.rejected.toString()]: (state: any, { payload }: any) => {
      state.loading = false
      state.error = payload ? payload : 'Todo creation failed.'
    },
    // delete todo
    [deleteTodo.pending.toString()]: (state: any) => {
      state.loading = true
      state.error = null
    },
    [deleteTodo.fulfilled.toString()]: (state: any, { payload }: any) => {
      state.loading = false
      state.todo = payload
    },
    [deleteTodo.rejected.toString()]: (state: any, { payload }: any) => {
      state.loading = false
      state.error = payload ? payload : 'Todo creation failed.'
    },
  },
})

export default todoSlice.reducer;