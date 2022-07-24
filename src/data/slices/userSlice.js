import axios from 'axios';
import { BASE_URL } from '../baseAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { navigate } from '../../core/router/navigator';
import { setLoading } from './globalSlice';
import Toast from 'react-native-toast-message';

axios.defaults.validateStatus = status => {
  return status < 500;
};

const showDoneToast = () => {
  Toast.show({
    type: 'success',
    text1: 'Update Profil Sukses!',
    text2: 'Silahkan refresh halaman ini untuk melihat perubahan',
  });
};

const showFailedToast = mes => {
  Toast.show({
    type: 'error',
    text1: 'Update Profil Gagal!',
    text2: `${mes.message}`,
  });
};

const showRegisterSuccess = () => {
  Toast.show({
    type: 'success',
    text1: 'Registrasi Sukses!',
    text2: 'Registrasi Akun Sukses',
  });
};

const showRegisterFail = mes => {
  Toast.show({
    type: 'error',
    text1: 'Registrasi Gagal!',
    text2: `${mes.message}`,
  });
};

const showUnauthorizeAcc = mes => {
  Toast.show({
    type: 'error',
    text1: 'Error, Aksi Gagal!',
    text2: `${mes.message.split('/')[0]}`,
  });
  navigate('Login');
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
        showRegisterSuccess();
      } else {
        showRegisterFail(response.data);
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
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    } finally {
      dispatch(setLoading(false));
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
            access_token: credentials.token,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if (response.status <= 201) {
        showDoneToast();
      } else {
        showFailedToast(response.data);
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
  access_token: '',
  userDetail: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogout: state => {
      return {
        ...state,
        access_token: '',
        userDetail: {},
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
        access_token: action.payload.access_token,
      };
    },
    [getUser.fulfilled]: (state, action) => {
      return {
        ...state,
        userDetail: action.payload,
      };
    },
    [updateUser.fulfilled]: state => {
      return {
        ...state,
      };
    },
  },
});

export const { setLogout, setLogin, setRegister } = userSlice.actions;
export default userSlice.reducer;
