import { createSlice } from '@reduxjs/toolkit'
import { fetchLoggedInUser, loginUser, logoutUser, registerUser } from '../actions/user'

const initialState = {
  loading: false,
  user: null,
  jwtToken: null, // for storing the JWT
  error: null,
  success: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    // register user
    [registerUser.pending.toString()]: (state: any) => {
      state.loading = true
      state.error = null
    },
    [registerUser.fulfilled.toString()]: (state: any, { payload }: any) => {
      state.loading = false
      state.success = true
      state.user = payload.account
      state.jwtToken = payload.jwtToken
    },
    [registerUser.rejected.toString()]: (state: any, { payload }: any) => {
      state.loading = false
      state.error = payload ? payload : 'Registration failed.'
    },

    // login user
    [loginUser.pending.toString()]: (state) => {
      state.loading = true
      state.error = null
    },
    [loginUser.fulfilled.toString()]: (state, { payload }) => {
      state.loading = false
      state.success = true
      state.user = payload.account
      state.jwtToken = payload.jwtToken
    },
    [loginUser.rejected.toString()]: (state, { payload }) => {
      state.loading = false
      state.error = payload ? payload : 'Login failed.'
    },

    // logout user
    [logoutUser.pending.toString()]: (state) => {
      state.loading = true
      state.error = null
    },
    [logoutUser.fulfilled.toString()]: (state, { payload }) => {
      state.loading = false
      state.success = true
      state.user = null
      state.jwtToken = null
    },
    [logoutUser.rejected.toString()]: (state, { payload }) => {
      state.loading = false
      state.error = payload ? payload : 'Logout failed.'
    },

    // fetch user
    [fetchLoggedInUser.pending.toString()]: (state) => {
      state.loading = true
      state.error = null
    },
    [fetchLoggedInUser.fulfilled.toString()]: (state, { payload }) => {
      state.loading = false
      state.success = true
      state.user = payload.account
    },
    [fetchLoggedInUser.rejected.toString()]: (state, { payload }) => {
      state.loading = false
      state.error = payload ? payload : 'Fetching user failed.'
    },
  },
})

export default userSlice.reducer;