import axios from 'axios';
import { BASE_URL } from '../baseAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading } from './globalSlice';

axios.defaults.validateStatus = status => {
  return status < 500;
};

// Seller Banner
export const getAllSellerBanner = createAsyncThunk(
  'seller/getAllSellerBanner',
  async (token, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${BASE_URL}/seller/banner`, {
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

export const getSellerBannerByID = createAsyncThunk(
  'seller/getSellerBannerByID',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${BASE_URL}/seller/banner/${credentials.id}`,
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

export const createSellerBanner = createAsyncThunk(
  'seller/createSellerBanner',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${BASE_URL}/seller/banner/${credentials.id}`,
        credentials.data,
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

export const deleteSellerBanner = createAsyncThunk(
  'seller/deleteSellerBanner',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.delete(
        `${BASE_URL}/seller/banner/${credentials.id}`,
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

// Seller Category
export const createSellerCategory = createAsyncThunk(
  'seller/createSellerCategory',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${BASE_URL}/seller/category`,
        credentials.data,
        {
          // headers: {
          //   Authorization: `Bearer ${credentials.token}`,
          // },
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

export const getSellerCategory = createAsyncThunk(
  'seller/getSellerCategory',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${BASE_URL}/seller/category`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const getSellerCategoryByID = createAsyncThunk(
  'seller/getSellerCategoryByID',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${BASE_URL}/seller/category/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const deleteSellerCategory = createAsyncThunk(
  'seller/deleteSellerCategory',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.delete(
        `${BASE_URL}/seller/category/${credentials.id}`,
        {
          // headers: {
          //   Authorization: `Bearer ${credentials.token}`,
          // },
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

// Seller Product
export const createSellerProduct = createAsyncThunk(
  'seller/createSellerProduct',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${BASE_URL}/seller/product`,
        credentials.data,
        {
          headers: {
            access_token: credentials.token,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response.status);
      return response.status;
    } catch (error) {
      return rejectWithValue(error.response.data);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const getSellerProduct = createAsyncThunk(
  'seller/getSellerProduct',
  async (token, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${BASE_URL}/seller/product`, {
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

export const getSellerProductByID = createAsyncThunk(
  'seller/getSellerProductByID',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${BASE_URL}/seller/product/${credentials.id}`,
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

export const updateSellerProduct = createAsyncThunk(
  'seller/updateSellerProduct',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.put(
        `${BASE_URL}/seller/product/${credentials.id}`,
        credentials.data,
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

export const deleteSellerProduct = createAsyncThunk(
  'seller/deleteSellerProduct',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.delete(
        `${BASE_URL}/seller/product/${credentials.id}`,
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

// Seller Order
export const getSellerOrder = createAsyncThunk(
  'seller/getSellerOrder',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${BASE_URL}/seller/order?status=${credentials.type}`,
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

export const getSellerOrderByID = createAsyncThunk(
  'seller/getSellerOrderByID',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${BASE_URL}/seller/order/${credentials.id}`,
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

export const updateSellerOrder = createAsyncThunk(
  'seller/updateSellerOrder',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.patch(
        `${BASE_URL}/seller/order/${credentials.id}`,
        credentials.data,
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

export const getSellerOrderProduct = createAsyncThunk(
  'seller/getSellerOrderProduct',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${BASE_URL}/seller/order/product/${credentials.product_id}`,
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
  banner: [],
  category: [],
  detailCategory: {},
  sellerProduct: [],
  sellerOrder: [],
  data: [],
  addProductStatus: 0,
};

const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  extraReducers: {
    [getAllSellerBanner.fulfilled]: (state, action) => {
      return {
        ...state,
        banner: action.payload,
      };
    },
    [getSellerBannerByID.fulfilled]: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
    [createSellerBanner.fulfilled]: state => {
      return {
        ...state,
      };
    },
    [deleteSellerBanner.fulfilled]: state => {
      return {
        ...state,
      };
    },
    [getSellerCategory.fulfilled]: (state, action) => {
      return {
        ...state,
        category: action.payload,
      };
    },
    [getSellerCategoryByID.fulfilled]: (state, action) => {
      return {
        ...state,
        detailCategory: action.payload,
      };
    },
    [createSellerCategory.fulfilled]: state => {
      return {
        ...state,
      };
    },
    [deleteSellerCategory.fulfilled]: state => {
      return {
        ...state,
      };
    },
    [getSellerProduct.fulfilled]: (state, action) => {
      return {
        ...state,
        sellerProduct: action.payload,
      };
    },
    [getSellerProductByID.fulfilled]: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
    [createSellerProduct.fulfilled]: action => {
      return {
        addProductStatus: action.payload,
      };
    },
    [updateSellerProduct.fulfilled]: state => {
      return {
        ...state,
      };
    },
    [deleteSellerProduct.fulfilled]: state => {
      return {
        ...state,
      };
    },
    [getSellerOrder.fulfilled]: (state, action) => {
      return {
        ...state,
        sellerOrder: action.payload,
      };
    },
    [getSellerOrderByID.fulfilled]: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
    [updateSellerOrder.fulfilled]: state => {
      return {
        ...state,
      };
    },
    [getSellerOrderProduct.fulfilled]: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
});

export default sellerSlice.reducer;
