import { Button, SelectChangeEvent, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { StatusChip } from 'components/StatusChip/StatusChip';
import { TasksContainer } from 'components/TasksContainer/TasksContainer';
import React from 'react';
import { IColumn, ITaskConfig } from 'types/types';

interface SearchFormProps {
  handleChangeSearchField: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  search: string;
  status: {
    all: string[];
    selected: string[];
    columns: IColumn[];
  };
  handleChangeStatus: (event: SelectChangeEvent<string[]>) => void;
  tasks: ITaskConfig[];
  handleSearchClick: () => void;
}

export const SearchForm = ({
  handleChangeSearchField,
  search,
  status,
  handleChangeStatus,
  tasks,
  handleSearchClick,
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
        onChange={handleChangeSearchField}
        value={search}
        placeholder="search in task titles or description"
        sx={{ width: '80%', borderRadius: '3rem' }}
      />
      <StatusChip all={status.all} selected={status.selected} onChange={handleChangeStatus} />
      <TasksContainer tasks={tasks} />
      <Button color="success" variant="contained" onClick={handleSearchClick}>
        Check for updates
      </Button>
    </Box>
  );
};
