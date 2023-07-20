import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiCall } from '../../api/api';
import { ActionTypes } from '../constants/action-types';
import { Todo } from '../../models/todo';

export const createTodo = createAsyncThunk(
  ActionTypes.CREATE_TODO,
  async (body: Todo, { rejectWithValue }) => {
    try {
      const { userId, ...rest } = body;
      const data = await apiCall(`/api/v1/todo/${userId}`, 'post', rest);
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

export const deleteTodo = createAsyncThunk(
  ActionTypes.DELETE_TODOS,
  async (id: number, { rejectWithValue }) => {
    try {
      const data = await apiCall(`/api/v1/todo/${id}`, 'delete');
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