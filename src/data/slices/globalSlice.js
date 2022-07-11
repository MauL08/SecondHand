import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isSecondLoading: false,
  isThirdLoading: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
    setSecondLoading: (state, action) => {
      return {
        ...state,
        isSecondLoading: action.payload,
      };
    },
    setThirdLoading: (state, action) => {
      return {
        ...state,
        isThirdLoading: action.payload,
      };
    },
  },
});

export const { setLoading, setSecondLoading, setThirdLoading } =
  globalSlice.actions;
export default globalSlice.reducer;
