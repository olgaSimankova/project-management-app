import { Box, Typography } from '@mui/material';
import SearchForm from 'features/SearchForm';
import React from 'react';

export const Search = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'start',
      flexDirection: 'column',
      minHeight: 'calc(100vh - 114px)',
      padding: '1.5rem 0.5rem',
    }}
  >
    <Typography variant="h5" color="palette.secondary.light">
      Search tasks
    </Typography>
    <SearchForm />
  </Box>
);
