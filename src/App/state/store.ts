import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../../api/auth.api';
import userSlice from '../../features/authSlice';

export const store = configureStore({
  reducer: { userState: userSlice, [authSlice.reducerPath]: authSlice.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
