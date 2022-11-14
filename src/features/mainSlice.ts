import { BoardConfig, MainState } from '../types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initBoardData } from 'constants/constants';

const initialState: MainState = {
  boards: [],
  isModalOpen: true,
  currentBoardData: initBoardData,
};

export const mainSlice = createSlice({
  initialState,
  name: 'mainSlice',
  reducers: {
    setBoards: (state, action: PayloadAction<BoardConfig[]>) => {
      state.boards = action.payload;
    },
    toggleModalWindow: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
  },
});

export default mainSlice.reducer;

export const { setBoards } = mainSlice.actions;
