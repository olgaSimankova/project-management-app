import React, { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { INVALID_TOKEN, LINKS } from '../../constants/constants';
import { useGetBoardQuery } from '../../api/main.api';
import { toast } from 'react-toastify';
import { Error, ErrorObject } from '../../types/types';
import { useDispatch } from 'react-redux';
import { logout } from 'features/authSlice';

const StyledBoardBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}));

const BoardHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { boardId } = useParams();
  const { data, isSuccess, isError, error } = useGetBoardQuery(boardId as string);

  const { title, description } = JSON.parse(data?.title || '{}');

  if (isError) {
    toast.error((error as Error).data.message);
  }

  useEffect(() => {
    if ((error as ErrorObject)?.data?.message === INVALID_TOKEN) {
      navigate(LINKS.welcome);
      dispatch(logout());
    }
  }, [dispatch, navigate, error]);

  return (
    <Box color="#707090">
      <StyledBoardBox pt={3}>
        <Button
          onClick={() => navigate(LINKS.main)}
          variant="outlined"
          startIcon={<ChevronLeftIcon />}
        >
          back
        </Button>
        <Typography>{isSuccess ? description : ''}</Typography>
      </StyledBoardBox>
      <Typography textAlign="center" fontSize={20}>
        {isSuccess ? title : ''}
      </Typography>
    </Box>
  );
};

export default BoardHeader;
