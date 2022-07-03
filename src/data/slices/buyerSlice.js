// import { Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../baseAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { navigate } from '../../core/router/navigator';
import { setLoading } from './globalSlice';

axios.defaults.validateStatus = status => {
  return status < 500;
};

// Buyer Product
export const getAllBuyerProduct = createAsyncThunk(
  'buyer/getBuyerProduct',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${BASE_URL}/buyer/product?status=${credentials.status}&category_id=${credentials.category_id}&search=${credentials.search}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const getBuyerProductByID = createAsyncThunk(
  'buyer/getBuyerProductByID',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${BASE_URL}/buyer/product/${id}`);
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
      dispatch(setLoading(true));
      const response = await axios.post(
        `${BASE_URL}/buyer/order`,
        credentials.data,
        {
          headers: {
            access_token: credentials.token,
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
  detailProduct: {},
  order: [],
  detailOrder: {},
};

const buyerSlice = createSlice({
  name: 'buyer',
  initialState,
  extraReducers: {
    [getAllBuyerProduct.fulfilled]: (state, action) => {
      return {
        ...state,
        product: action.payload,
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

export default buyerSlice.reducer;
