import { Button, SelectChangeEvent, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { StatusChip } from 'components/StatusChip/StatusChip';
import { TasksContainer } from 'components/TasksContainer/TasksContainer';
import React from 'react';
import { IColumn, ITaskConfig } from 'types/types';

interface SearchFormProps {
  onChangeSearchField: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  search: string;
  status: {
    all: string[];
    selected: string[];
    columns: IColumn[];
  };
  onChangeStatus: (event: SelectChangeEvent<string[]>) => void;
  tasks: ITaskConfig[];
}

export const SearchForm = ({
  onChangeSearchField,
  search,
  status,
  onChangeStatus,
  tasks,
}: SearchFormProps) => {
  return (
    <Box
      sx={{
        maxWidth: '80vw',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      <TextField
        name="search"
        id="search"
        type="text"
        autoFocus
        variant="outlined"
        onChange={onChangeSearchField}
        value={search}
        placeholder="search in task titles or description"
        sx={{ width: '80%', borderRadius: '3rem' }}
      />
      <StatusChip all={status.all} selected={status.selected} onChange={onChangeStatus} />
      <TasksContainer tasks={tasks} />
    </Box>
  );
};
