import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../baseAPI';
import { setLoading } from './globalSlice';
import { navigate } from '../../core/router/navigator';
import Toast from 'react-native-toast-message';

axios.defaults.validateStatus = status => {
  return status < 500;
};

const showUnauthorizeAcc = mes => {
  Toast.show({
    type: 'error',
    text1: 'Error, Aksi Gagal!',
    text2: `${mes.message.split('/')[0]}`,
  });
  navigate('Login');
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
      if (response.status >= 400) {
        showUnauthorizeAcc(response.data);
      }
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
      if (response.status >= 400) {
        showUnauthorizeAcc(response.data);
      }
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
