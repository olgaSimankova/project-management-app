import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { LINKS } from '../../constants/constants';
import { useGetBoardQuery } from '../../api/main.api';
import { toast } from 'react-toastify';
import { Error } from '../../types/types';

const StyledBoardBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}));

const BoardHeader = () => {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const { data, isSuccess, isError, error } = useGetBoardQuery(boardId as string);

  const { title, description } = JSON.parse(data?.title || '{}');

  if (isError) {
    toast.error((error as Error).data.message);
  }

  return (
    <>
      <StyledBoardBox pt={3}>
        <Button
          onClick={() => navigate(LINKS.main)}
          variant="outlined"
          startIcon={<ChevronLeftIcon />}
        >
          back
        </Button>
        <Typography fontSize={18}>{isSuccess ? title : ''}</Typography>
      </StyledBoardBox>
      <Typography mt={1}>{isSuccess ? description : ''}</Typography>
    </>
  );
};

export default BoardHeader;
