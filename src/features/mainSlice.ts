import { BoardConfig, MainState } from '../types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: MainState = {
  boards: [],
};

export const mainSlice = createSlice({
  initialState,
  name: 'mainSlice',
  reducers: {
    setBoards: (state, action: PayloadAction<BoardConfig[]>) => {
      state.boards = action.payload;
    },
  },
});

export default mainSlice.reducer;

export const { setBoards } = mainSlice.actions;
