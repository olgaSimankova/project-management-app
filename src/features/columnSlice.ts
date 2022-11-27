import { BoardState, IColumn, ITaskConfig } from '../types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: BoardState = {
  columns: [],
  tasks: {},
};

export const boardSlice = createSlice({
  initialState,
  name: 'boardSlice',
  reducers: {
    addBoards: (state, action: PayloadAction<IColumn[]>) => {
      state.columns = action.payload;
    },
    addTasks: (state, action: PayloadAction<{ id: string; data: ITaskConfig[] }>) => {
      state.tasks[action.payload.id] = action.payload.data;
    },
  },
});

export default boardSlice.reducer;
export const { addBoards, addTasks } = boardSlice.actions;
