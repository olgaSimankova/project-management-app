import { Box, Button, Typography } from '@mui/material';
import { useGetBoardsMutation } from 'api/main.api';
import { BoardForm } from 'components/BoardForm/BoardForm';
import { BoardsContainer } from 'components/BoardsContainer/BoardsContainer';
import { useAuth } from 'hooks/useAuth';
import { useMain } from 'hooks/useMain';
import React, { useEffect } from 'react';
import { BoardFormOptions } from 'types/types';

export const Main = () => {
  const { token } = useAuth();
  const { isModalOpen, currentBoardData } = useMain();
  const [getBoards] = useGetBoardsMutation();
  const mockBoards = [
    { title: 'First board', description: 'First board description' },
    {
      title: 'Second board fsdf sf sf sfdhd fsd fsdf sf sfs fh f',
      description:
        'Second board description gfgd gfg dgdfg dg dg fdsfsdf sdf fd fsgfdg dg dfghdg fh dfgh dfsfs gf fsfgd gsfsfsgdfhdghdg dgd g d ',
    },
  ];

  useEffect(() => {
    if (token) {
      getBoards({});
    }
  }, [token]);
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
      {isModalOpen && <BoardForm {...{ option: BoardFormOptions.create }} />}
    </Box>
  );
};
