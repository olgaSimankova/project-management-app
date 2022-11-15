import { BoardConfig, BoardFormOptions, MainState } from '../types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initBoardData } from 'constants/constants';

const initialState: MainState = {
  boards: [],
  isModalOpen: false,
  currentBoardData: initBoardData,
  modalOption: BoardFormOptions.create,
};

export const mainSlice = createSlice({
  initialState,
  name: 'mainSlice',
  reducers: {
    setBoards: (state, action: PayloadAction<BoardConfig[]>) => {
      state.boards = action.payload;
    },
    addBoard: (state, action: PayloadAction<BoardConfig>) => {
      state.boards.push(action.payload);
    },
    deleteBoard: (state, action: PayloadAction<string>) => {
      state.boards = state.boards.filter((board) => board._id !== action.payload);
    },
    toggleModalWindow: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    setModalOption: (state, action: PayloadAction<BoardFormOptions>) => {
      state.modalOption = action.payload;
    },
  },
});

export default mainSlice.reducer;

export const { setBoards, toggleModalWindow, setModalOption, addBoard, deleteBoard } =
  mainSlice.actions;
