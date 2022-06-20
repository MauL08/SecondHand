// import { Alert } from 'react-native';
import axios from 'axios';
// import { baseURL } from '../baseAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { navigate } from '../../core/router/navigator';
// import { setLoading } from './globalSlice';

axios.defaults.validateStatus = status => {
  return status < 500;
};

export const getAllNotification = createAsyncThunk();

export const getNotificationByID = createAsyncThunk();

export const updateNotification = createAsyncThunk();

const initialState = {
  data: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  extraReducers: {},
});

export default notificationSlice.reducer;
