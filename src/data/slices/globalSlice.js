import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pagination: 1,
  isLoading: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setLastSeen(state, action) {
      state.pagination = action.payload;
    },
  },
});

export const { setLoading, setLastSeen } = globalSlice.actions;
export default globalSlice.reducer;
