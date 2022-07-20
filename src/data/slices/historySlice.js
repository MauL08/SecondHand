import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../baseAPI';
import { setLoading } from './globalSlice';

axios.defaults.validateStatus = status => {
  return status < 500;
};

export const getAllHistory = createAsyncThunk(
  'history/getAllHistory',
  async (token, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${BASE_URL}/history`, {
        headers: {
          access_token: token,
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

export const getHistoryByID = createAsyncThunk(
  'history/getHistoryByID',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${BASE_URL}/history/${credentials.id}`,
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
  historyData: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  extraReducers: {
    [getAllHistory.fulfilled]: (state, action) => {
      return {
        ...state,
        historyData: action.payload,
      };
    },
    [getHistoryByID.fulfilled]: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
});

export default historySlice.reducer;
