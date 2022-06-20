// import { Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../baseAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { navigate } from '../../core/router/navigator';
import { setLoading } from './globalSlice';

axios.defaults.validateStatus = status => {
  return status < 500;
};

export const getAllNotification = createAsyncThunk(
  'notification/getAllNotification',
  async (token, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${BASE_URL}/notification`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const getNotificationByID = createAsyncThunk(
  'notification/getNotificationByID',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${BASE_URL}/notification/${credentials.id}`,
        {
          headers: {
            Authorization: `Bearer ${credentials.token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const updateNotification = createAsyncThunk(
  'notification/updateNotification',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.patch(
        `${BASE_URL}/notification/${credentials.id}`,
        {
          headers: {
            Authorization: `Bearer ${credentials.token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

const initialState = {
  data: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  extraReducers: {
    [getAllNotification.fulfilled]: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
    [getNotificationByID.fulfilled]: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
    [updateNotification.fulfilled]: state => {
      return {
        ...state,
      };
    },
  },
});

export default notificationSlice.reducer;