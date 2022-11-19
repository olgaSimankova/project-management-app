import { IUser, IUserSavingData, IUserState } from '../types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IUserState = {
  user: null,
  login: null,
  token: null,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: () => {
      localStorage.clear();
      return initialState;
    },
    setUserInfo: (state, action: PayloadAction<IUserSavingData>) => {
      localStorage.setItem(
        'credentials',
        JSON.stringify({ token: action.payload.token, login: action.payload.login })
      );
      state.token = action.payload.token;
      state.login = action.payload.login;
    },
    setUser: (state, action: PayloadAction<IUser | null>) => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { logout, setUserInfo, setUser } = userSlice.actions;
