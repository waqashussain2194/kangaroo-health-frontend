import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiCall } from '../../api/api';
import { Account } from '../../models/account';
import { ActionTypes } from '../constants/action-types';

export const registerUser = createAsyncThunk(
  ActionTypes.REGISTER,
  async (creds: Account, { rejectWithValue }) => {
    try {
      const data = await apiCall('/api/v1/auth/register', 'post', creds);
      // store user's token in local storage
      localStorage.setItem('jwtToken', data.jwtToken);
      localStorage.setItem('userId', data.account.id);
      return data;
    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const loginUser = createAsyncThunk(
  ActionTypes.LOGIN,
  async (creds: Account, { rejectWithValue }) => {
    try {
      const data = await apiCall('/api/v1/auth/login', 'post', creds);
      // store user's token in local storage
      localStorage.setItem('jwtToken', data.jwtToken);
      localStorage.setItem('userId', data.account.id);
      return data;
    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const logoutUser = createAsyncThunk(
  ActionTypes.LOGOUT,
  async (_: void, { rejectWithValue }) => {
    // remove user's token from local storage
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    return true;
  },
);

export const fetchLoggedInUser = createAsyncThunk(
  ActionTypes.FETCH_LOGGED_IN_USER,
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await apiCall(`/api/v1/account/${id}`, 'get', undefined);
      // store user's token in local storage
      return data;
    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
