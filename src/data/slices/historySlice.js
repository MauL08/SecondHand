// import { Alert } from 'react-native';
import axios from 'axios';
// import { baseURL } from '../baseAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { navigate } from '../../core/router/navigator';
// import { setLoading } from './globalSlice';

axios.defaults.validateStatus = status => {
  return status < 500;
};

export const test = createAsyncThunk();

const initialState = {
  data: {},
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  extraReducers: {},
});

export default historySlice.reducer;
