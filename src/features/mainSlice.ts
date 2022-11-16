import { BoardConfig, BoardFormOptions, MainState } from '../types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initBoardData } from 'constants/constants';

const initialState: MainState = {
  boards: [],
  isModalOpen: false,
  currentBoardData: initBoardData,
  modalOption: BoardFormOptions.create,
  isConfirmationOpen: false,
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
    updateBoard: (state, action: PayloadAction<BoardConfig>) => {
      state.boards = state.boards.map((board) =>
        board._id === action.payload._id ? action.payload : board
      );
    },
    toggleModalWindow: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    toggleConfirmationWindow: (state, action: PayloadAction<boolean>) => {
      state.isConfirmationOpen = action.payload;
    },
    setModalOption: (state, action: PayloadAction<BoardFormOptions>) => {
      state.modalOption = action.payload;
    },
    setCurrentBoardData: (state, action: PayloadAction<string>) => {
      state.currentBoardData =
        state.boards.filter((board) => board._id === action.payload)[0] || initBoardData;
    },
  },
});

export default mainSlice.reducer;

export const {
  setBoards,
  toggleModalWindow,
  setModalOption,
  addBoard,
  deleteBoard,
  setCurrentBoardData,
  updateBoard,
  toggleConfirmationWindow,
} = mainSlice.actions;
