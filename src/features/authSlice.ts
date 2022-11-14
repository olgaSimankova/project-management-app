import { IUser, IUserState } from '../types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IUserState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: () => {
      localStorage.clear();
      return initialState;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      localStorage.setItem('token', JSON.stringify(action.payload));
      state.token = action.payload;
    },
  },
});

export default authSlice.reducer;

export const { logout, setUser, setToken } = authSlice.actions;
