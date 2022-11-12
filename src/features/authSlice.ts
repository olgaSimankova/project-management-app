import { ISignInResponse, IUser } from '../types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
  user: IUser | null;
  token: string | null;
}

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
      localStorage.setItem('user', JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<ISignInResponse>) => {
      localStorage.setItem('token', JSON.stringify({ token: action.payload.token }));
      state.token = action.payload.token;
    },
  },
});

export default authSlice.reducer;

export const { logout, setUser, setToken } = authSlice.actions;
