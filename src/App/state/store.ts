import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../../api/auth.api';
import userSlice from '../../features/authSlice';

export const store = configureStore({
  reducer: { userState: userSlice, [authApi.reducerPath]: authApi.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
