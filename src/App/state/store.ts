import { configureStore } from '@reduxjs/toolkit';
import { mainApi } from 'api/main.api';
import mainSlice from 'features/mainSlice';
import { authApi } from '../../api/auth.api';
import userSlice from '../../features/authSlice';
import { columnApi } from '../../api/column.api';
import { userApi } from '../../api/user.api';
import themeSlice from 'theme/themeSlice';

export const store = configureStore({
  reducer: {
    userState: userSlice,
    [authApi.reducerPath]: authApi.reducer,
    [columnApi.reducerPath]: columnApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    mainState: mainSlice,
    [mainApi.reducerPath]: mainApi.reducer,
    themeState: themeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      columnApi.middleware,
      userApi.middleware,
      mainApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
