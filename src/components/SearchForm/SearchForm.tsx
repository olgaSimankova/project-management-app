import { Button, SelectChangeEvent, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useGetAllColumnsByUserIDQuery } from 'api/column.api';
import { useGetAllTasksByUserIDQuery } from 'api/task.api';
import { StatusChip } from 'components/StatusChip/StatusChip';
import { TasksContainer } from 'components/TasksContainer/TasksContainer';
import { useAuth } from 'hooks/useAuth';
import React, { useEffect, useState } from 'react';
import { ITaskConfig } from 'types/types';

export const SearchForm = () => {
  const { user } = useAuth();
  const { data: statuses = [], isSuccess } = useGetAllColumnsByUserIDQuery(user?._id || '');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState({
    all: [] as string[],
    selected: ['All'],
    columns: statuses,
  });
  const {
    data: tasksData = [],
    isSuccess: getTasksSuccess,
    refetch,
  } = useGetAllTasksByUserIDQuery(user?._id || '');
  const [tasks, setTasks] = useState(tasksData);
  const handleChangeSearchField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (isSuccess) {
      setStatus((state) => ({ ...state, all: statuses.map((el) => el.title), columns: statuses }));
    }
  }, [statuses, isSuccess]);

  const filterTasks = (tasks: ITaskConfig[]): ITaskConfig[] => {
    let filteredTasks = [...tasks];
    if (!status.selected.includes('All')) {
      const columnsId = status.columns
        .filter((column) => status.selected.includes(column.title))
        .map((column) => column._id);
      filteredTasks = filteredTasks.filter((task) => columnsId.includes(task.columnId));
    }
    return filteredTasks.filter(
      (task) => task.title.includes(search) || task.description.includes(search)
    );
  };

  useEffect(() => {
    if (getTasksSuccess) {
      setTasks(filterTasks(tasksData));
    }
  }, [tasksData, getTasksSuccess, filterTasks]);

  const handleChangeStatus = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    const values = typeof value === 'string' ? value.split(',') : value;
    setStatus((state) => ({
      ...state,
      selected: values.length ? values.filter((el) => el !== 'All') : ['All'],
    }));
  };

  const handleSearchClick = () => {
    refetch();
    setTasks(filterTasks(tasksData));
  };

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
