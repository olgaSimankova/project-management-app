import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { useAppSelector } from './useAppSelector';
import { ITaskConfig } from '../types/types';

export const useAssignees = (columnId?: string, taskId?: string) => {
  const { tasks } = useAppSelector((state) => state.boardState);
  const initialState = columnId
    ? tasks[columnId].find((task: ITaskConfig) => task._id === taskId)?.users
    : [];

  const [assignees, setAssignees] = useState<string[]>(initialState || []);

  const handleChangeAssignee = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setAssignees(typeof value === 'string' ? value.split(',') : value);
  };

  const clearAssigneeInput = () => {
    setAssignees([]);
  };

  return { assignees, handleChangeAssignee, clearAssigneeInput };
};
