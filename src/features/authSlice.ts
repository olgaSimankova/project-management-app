import { IUser } from '../types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
  user: IUser | null;
}

const initialState: IUserState = {
  user: null,
};

export const authSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setCredentials: (state, action) => {},
  },
});

export default authSlice.reducer;

export const { logout, setUser } = authSlice.actions;
