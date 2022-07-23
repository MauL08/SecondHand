import axios from 'axios';
import { BASE_URL } from '../baseAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading } from './globalSlice';
import Toast from 'react-native-toast-message';
import { navigate } from '../../core/router/navigator';

axios.defaults.validateStatus = status => {
  return status < 500;
};

const showDoneToast = () => {
  Toast.show({
    type: 'success',
    text1: 'Sukses!',
    text2: 'Produk Sukses Diterbitkan',
  });
};

const showFailedToast = mes => {
  Toast.show({
    type: 'error',
    text1: 'Gagal!',
    text2: `${mes.message}`,
  });
};

const showDoneUpdateToast = () => {
  Toast.show({
    type: 'success',
    text1: 'Sukses!',
    text2: 'Produk berhasil dikonfirmasi',
  });
};

const showDoneEditToast = () => {
  Toast.show({
    type: 'success',
    text1: 'Sukses!',
    text2: 'Produk berhasil terupdate',
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

// Seller Banner
export const getAllSellerBanner = createAsyncThunk(
  'seller/getAllSellerBanner',
  async (token, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${BASE_URL}/seller/banner`);
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

export const getSellerCategory = createAsyncThunk(
  'seller/getSellerCategory',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${BASE_URL}/seller/category`);
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

export const getSellerCategoryByID = createAsyncThunk(
  'seller/getSellerCategoryByID',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${BASE_URL}/seller/category/${id}`);
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

export const getSellerProductByID = createAsyncThunk(
  'seller/getSellerProductByID',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${BASE_URL}/seller/product/${credentials.id}`,
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

export const updateSellerProduct = createAsyncThunk(
  'seller/updateSellerProduct',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.patch(
        `${BASE_URL}/seller/product/${credentials.id}`,
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

export const updateSellerDetailProduct = createAsyncThunk(
  'seller/updateSellerDetailProduct',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.put(
        `${BASE_URL}/seller/product/${credentials.id}`,
        credentials.data,
        {
          headers: {
            access_token: credentials.token,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if (response.status <= 201) {
        showDoneEditToast();
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

export const deleteSellerProduct = createAsyncThunk(
  'seller/deleteSellerProduct',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.delete(
        `${BASE_URL}/seller/product/${credentials.id}`,
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

export const getSellerPendingOrder = createAsyncThunk(
  'seller/getSellerPendingOrder',
  async (token, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${BASE_URL}/seller/order?status=pending`,
        {
          headers: {
            access_token: token,
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

export const getSellerAcceptedOrder = createAsyncThunk(
  'seller/getSellerAcceptedOrder',
  async (token, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${BASE_URL}/seller/order?status=accepted`,
        {
          headers: {
            access_token: token,
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

export const getSellerOrderByID = createAsyncThunk(
  'seller/getSellerOrderByID',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${BASE_URL}/seller/order/${credentials.id}`,
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
            access_token: credentials.token,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if (response.status <= 201) {
        showDoneUpdateToast();
      } else {
        showFailedToast();
      }
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
  banner: [],
  category: [],
  detailCategory: {},
  sellerProduct: [],
  sellerProductDetail: {},
  sellerOrder: [],
  sellerOrderDetail: {},
  sellerAcceptedOrder: [],
  sellerPendingOrder: [],
  data: [],
};

const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {
    resetSellerData: state => {
      return {
        ...state,
        sellerProduct: [],
        sellerOrder: [],
      };
    },
    resetSellerProductDetail: state => {
      return {
        ...state,
        sellerProductDetail: {},
      };
    },
  },
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
        sellerProductDetail: action.payload,
      };
    },
    [createSellerProduct.fulfilled]: state => {
      return {
        ...state,
      };
    },
    [updateSellerProduct.fulfilled]: state => {
      return {
        ...state,
      };
    },
    [updateSellerDetailProduct.fulfilled]: state => {
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
    [getSellerAcceptedOrder.fulfilled]: (state, action) => {
      return {
        ...state,
        sellerAcceptedOrder: action.payload,
      };
    },
    [getSellerPendingOrder.fulfilled]: (state, action) => {
      return {
        ...state,
        sellerPendingOrder: action.payload,
      };
    },
    [getSellerOrderByID.fulfilled]: (state, action) => {
      return {
        ...state,
        sellerOrderDetail: action.payload,
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

export const { resetSellerData, resetSellerProductDetail } =
  sellerSlice.actions;
export default sellerSlice.reducer;
