import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
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
    setLogin: (state, action) => {
      return {
        ...state,
        id: action.payload.id,
        userInfo: action.payload,
      };
    },
    setRegister: (state, action) => {
      return {
        ...state,
        id: action.payload.id,
        userInfo: action.payload,
      };
    },
  },
});

export const { setLogout, setLogin, setRegister } = userSlice.actions;
export default userSlice.reducer;
