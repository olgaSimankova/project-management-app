import { configureStore } from '@reduxjs/toolkit';
import { mainApi } from 'api/main.api';
import mainSlice from 'features/mainSlice';
import { authSlice } from '../../api/auth.api';
import userSlice from '../../features/authSlice';

export const store = configureStore({
  reducer: {
    userState: userSlice,
    [authSlice.reducerPath]: authSlice.reducer,
    mainState: mainSlice,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authSlice.middleware, mainApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
