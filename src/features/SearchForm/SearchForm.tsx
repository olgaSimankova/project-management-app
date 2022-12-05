import { SelectChangeEvent, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { StatusChip } from 'components/StatusChip/StatusChip';
import { TasksContainer } from 'components/TasksContainer/TasksContainer';
import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        marginTop: '1rem',
      }}
    >
      <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
        <TextField
          name="search"
          id="search"
          type="text"
          autoFocus
          variant="outlined"
          onChange={onChangeSearchField}
          value={search}
          placeholder={t('searchFieldPlaceholder') || ''}
          sx={{ width: '30%', minWidth: '11rem', borderRadius: '3rem' }}
          margin="normal"
        />
        <StatusChip all={status.all} selected={status.selected} onChange={onChangeStatus} />
      </Box>

      <TasksContainer tasks={tasks} />
    </Box>
  );
};
