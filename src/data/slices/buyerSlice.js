import axios from 'axios';
import { BASE_URL } from '../baseAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading, setSecondLoading } from './globalSlice';
import Toast from 'react-native-toast-message';
import { navigate } from '../../core/router/navigator';

axios.defaults.validateStatus = status => {
  return status < 500;
};

const showDoneToast = () => {
  Toast.show({
    type: 'success',
    text1: 'Penawaran Sukses!',
    text2: 'Harga tawarmu berhasil dikirim ke penjual',
  });
};

const showFailedToast = mes => {
  Toast.show({
    type: 'error',
    text1: 'Penawaran Gagal!',
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

// Buyer Product
export const getAllBuyerProduct = createAsyncThunk(
  'buyer/getBuyerProduct',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${BASE_URL}/buyer/product?status=${credentials.status}&category_id=${credentials.category_id}&search=${credentials.search}&page=${credentials.page}&per_page=${credentials.per_page}`,
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

export const getNextPageProduct = createAsyncThunk(
  'buyer/getNextBuyerProduct',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setSecondLoading(true));
      const response = await axios.get(
        `${BASE_URL}/buyer/product?status=${credentials.status}&category_id=${credentials.category_id}&search=${credentials.search}&page=${credentials.page}&per_page=${credentials.per_page}`,
      );
      if (response.status >= 400) {
        showUnauthorizeAcc(response.data);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    } finally {
      dispatch(setSecondLoading(false));
    }
  },
);

export const getBuyerProductByID = createAsyncThunk(
  'buyer/getBuyerProductByID',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${BASE_URL}/buyer/product/${id}`);
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

// Buyer Order
export const getAllBuyerOrder = createAsyncThunk(
  'buyer/getAllBuyerOrder',
  async (token, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${BASE_URL}/buyer/order`, {
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

export const getBuyerOrderByID = createAsyncThunk(
  'buyer/getBuyerOrderByID',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${BASE_URL}/buyer/order/${credentials.id}`,
        {
          headers: {
            access_token: credentials.token,
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

export const createBuyerOrder = createAsyncThunk(
  'buyer/createBuyerOrder',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setSecondLoading(true));
      const response = await axios.post(
        `${BASE_URL}/buyer/order`,
        credentials.data,
        {
          headers: {
            access_token: credentials.token,
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
      dispatch(setSecondLoading(false));
    }
  },
);

export const updateBuyerOrder = createAsyncThunk(
  'buyer/updateBuyerOrder',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.put(
        `${BASE_URL}/buyer/order/${credentials.id}`,
        credentials.data,
        {
          headers: {
            access_token: credentials.token,
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

export const deleteBuyerOrder = createAsyncThunk(
  'buyer/deleteBuyerOrder',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.delete(
        `${BASE_URL}/buyer/order/${credentials.id}`,
        {
          headers: {
            access_token: credentials.token,
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
  product: [],
  nextPageProduct: [],
  detailProduct: {},
  order: [],
  detailOrder: {},
};

const buyerSlice = createSlice({
  name: 'buyer',
  initialState,
  reducers: {
    resetBuyerData: state => {
      return {
        ...state,
        order: [],
      };
    },
  },
  extraReducers: {
    [getAllBuyerProduct.fulfilled]: (state, action) => {
      return {
        ...state,
        product: action.payload,
      };
    },
    [getNextPageProduct.fulfilled]: (state, action) => {
      return {
        ...state,
        nextPageProduct: action.payload,
        product: [...state.product, ...state.nextPageProduct],
      };
    },
    [getBuyerProductByID.fulfilled]: (state, action) => {
      return {
        ...state,
        detailProduct: action.payload,
      };
    },
    [getAllBuyerOrder.fulfilled]: (state, action) => {
      return {
        ...state,
        order: action.payload,
      };
    },
    [getBuyerOrderByID.fulfilled]: (state, action) => {
      return {
        ...state,
        detailOrder: action.payload,
      };
    },
    [createBuyerOrder.fulfilled]: state => {
      return {
        ...state,
      };
    },
    [updateBuyerOrder.fulfilled]: state => {
      return {
        ...state,
      };
    },
    [deleteBuyerOrder.fulfilled]: state => {
      return {
        ...state,
      };
    },
  },
});

export const { resetBuyerData } = buyerSlice.actions;
export default buyerSlice.reducer;
