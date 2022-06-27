import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import userSlice from './slices/userSlice';
import globalSlice from './slices/globalSlice';
import buyerSlice from './slices/buyerSlice';
import sellerSlice from './slices/sellerSlice';
import historySlice from './slices/historySlice';
import notificationSlice from './slices/notificationSlice';

const reducers = combineReducers({
  global: globalSlice,
  user: userSlice,
  buyer: buyerSlice,
  seller: sellerSlice,
  history: historySlice,
  notification: notificationSlice,
});

const persistConfig = {
  key: 'Key-App',
  storage: AsyncStorage,
  timeout: null,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
