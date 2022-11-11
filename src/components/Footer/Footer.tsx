import { Avatar, Box } from '@mui/material';
import React from 'react';

export const Footer = () => {
  return (
    <Box>
      <Avatar
        variant={'rounded'}
        alt="RS Logo"
        src="https://rs.school/images/rs_school_js.svg"
        sx={{
          height: 50,
          width: 70,
        }}
      />
    </Box>
  );
};
