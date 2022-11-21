import { Box, Typography } from '@mui/material';
import { SearchForm } from 'components/SearchForm/SearchForm';
import React from 'react';

export const Search = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '1.5rem',
    }}
  >
    <Typography variant="h4" color="primary">
      Search tasks
    </Typography>
    <SearchForm />
  </Box>
);
