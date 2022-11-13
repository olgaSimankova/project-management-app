import { Box, Button, Typography } from '@mui/material';
import { BoardsContainer } from 'components/BoardsContainer/BoardsContainer';
import React from 'react';

export const Main = () => {
  console.log(process.env.NODE_ENV);
  const mockBoards = [
    { title: 'First board', description: 'First board description' },
    {
      title: 'Second board fsdf sf sf sfdhd fsd fsdf sf sfs fh f',
      description:
        'Second board description gfgd gfg dgdfg dg dg fdsfsdf sdf fd fsgfdg dg dfghdg fh dfgh dfsfs gf fsfgd gsfsfsgdfhdghdg dgd g d ',
    },
  ];
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '80vw',
        height: '80vh',
        margin: '1rem auto',
      }}
    >
      <Typography variant="h4">Boards</Typography>
      <Button variant="contained" color="success" sx={{ width: 'fit-content' }}>
        Add board
      </Button>
      <BoardsContainer boards={mockBoards} />
    </Box>
  );
};
