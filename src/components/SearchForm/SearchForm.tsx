import { Button, SelectChangeEvent, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useGetAllColumnsByUserIDQuery } from 'api/column.api';
import { StatusChip } from 'components/StatusChip/StatusChip';
import { useAuth } from 'hooks/useAuth';
import React, { useEffect, useState } from 'react';

export const SearchForm = () => {
  const { user } = useAuth();
  const { data: statuses = [], isSuccess } = useGetAllColumnsByUserIDQuery(user?._id || '');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState({ all: [] as string[], selected: ['All'] });
  console.log(statuses);
  const handleChangeSearchField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (isSuccess) {
      setStatus((state) => ({ ...state, all: statuses.map((el) => el.title) }));
    }
  }, [statuses, isSuccess]);

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

  return (
    <Box
      sx={{
        maxWidth: '30rem',
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
        placeholder="serch in task titles or description"
        sx={{ width: '80%', borderRadius: '3rem' }}
      />
      <StatusChip
        all={status.all}
        selected={status.selected}
        onChange={handleChangeStatus}
        onClose={() => {}}
      />
      <Button type="submit" color="success" variant="contained">
        Search
      </Button>
    </Box>
  );
};
