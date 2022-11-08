import React from 'react';
import { Box, Button } from '@mui/material';
import { PAGES } from '../../constants/constants';

const NavLinks = () => {
  return (
    <Box sx={{ m: '0 auto' }}>
      {PAGES.map((page) => (
        <Button key={page} sx={{ color: 'white' }}>
          {page}
        </Button>
      ))}
    </Box>
  );
};

export default NavLinks;
