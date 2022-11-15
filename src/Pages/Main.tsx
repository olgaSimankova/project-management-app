import { Box, Button, Typography } from '@mui/material';
import { useCreateBoardMutation, useGetBoardsMutation } from 'api/main.api';
import { BoardForm } from 'components/BoardForm/BoardForm';
import { BoardsContainer } from 'components/BoardsContainer/BoardsContainer';
import { setModalOption, toggleModalWindow } from 'features/mainSlice';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAuth } from 'hooks/useAuth';
import { useMain } from 'hooks/useMain';
import React, { useEffect } from 'react';
import { BoardFormOptions } from 'types/types';

export const Main = () => {
  const dispatch = useAppDispatch();
  const { token } = useAuth();
  const { isModalOpen, currentBoardData, modalOption, boards } = useMain();
  const [getBoards] = useGetBoardsMutation();
  const [createBoard] = useCreateBoardMutation();
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

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(setModalOption(BoardFormOptions.create));
    dispatch(toggleModalWindow(true));
  };

  const handleClickModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    console.log((e.target as HTMLElement).dataset.testid);
    switch ((e.target as HTMLElement).dataset.testid) {
      case 'close':
        dispatch(toggleModalWindow(false));
        break;
      case 'create':
        createBoard({ title: '1', users: [], owner: 'loh' });
        dispatch(toggleModalWindow(false));
        break;
      default:
    }
  };
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
      <Button
        variant="contained"
        color="success"
        sx={{ width: 'fit-content' }}
        onClick={handleButtonClick}
      >
        Add board
      </Button>
      <BoardsContainer boards={boards} />
      {isModalOpen && <BoardForm {...{ option: modalOption, onClick: handleClickModal }} />}
    </Box>
  );
};
