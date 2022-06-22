import { Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../baseAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { navigate } from '../../core/router/navigator';
import { setLoading } from './globalSlice';

axios.defaults.validateStatus = status => {
  return status < 500;
};

export const postRegister = createAsyncThunk(
  'user/registerAuth',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${BASE_URL}/auth/register`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status <= 201) {
        dispatch(setLoading(false));
        navigate('Login');
        Alert.alert('Success', 'Register Success!');
      }
      if (response.status === 400) {
        Alert.alert('Error', response.data.message);
        dispatch(setLoading(false));
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const postLogin = createAsyncThunk(
  'user/loginAuth',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${BASE_URL}/auth/login`, data);
      if (response.status <= 201) {
        dispatch(setLoading(false));
        navigate('Main');
        dispatch(setLoading(true));
      }
      if (response.status === 401) {
        const logErr = response.data.message;
        Alert.alert('Error', logErr);
        dispatch(setLoading(false));
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async (token, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${BASE_URL}/auth/user`, {
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

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.put(
        `${BASE_URL}/auth/user`,
        credentials.data,
        {
          headers: {
            Authorization: `Bearer ${credentials.token}`,
          },
        },
      );
      if (response.status <= 201) {
        dispatch(setLoading(false));
        Alert.alert('Success', 'User Updated!');
      }
      if (response.status === 400) {
        Alert.alert('Error', response.data.message);
        dispatch(setLoading(false));
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  access_token: '',
  userInfo: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogout: state => {
      return {
        ...state,
        id: '',
        userInfo: {},
      };
    },
  },
  extraReducers: {
    [postRegister.fulfilled]: state => {
      return {
        ...state,
      };
    },
    [postLogin.fulfilled]: (state, action) => {
      return {
        ...state,
        userInfo: action.payload,
        access_token: action.payload.access_token,
      };
    },
    [getUser.fulfilled]: (state, action) => {
      return {
        ...state,
        userInfo: action.payload,
      };
    },
    [updateUser.fulfilled]: (state, action) => {
      return {
        ...state,
        userInfo: action.payload,
      };
    },
  },
});

export const { setLogout, setLogin, setRegister } = userSlice.actions;
export default userSlice.reducer;
