import { IUserState } from '../types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IUserState = {
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
    setToken: (state, action: PayloadAction<string>) => {
      localStorage.setItem('token', JSON.stringify(action.payload));
      state.token = action.payload;
    },
  },
});

export default authSlice.reducer;

export const { logout, setToken } = authSlice.actions;
