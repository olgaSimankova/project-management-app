import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../../api/auth.api';

export const store = configureStore({
  reducer: { [authSlice.reducerPath]: authSlice.reducer },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authSlice.middleware)
});