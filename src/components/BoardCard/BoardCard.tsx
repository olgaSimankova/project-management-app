import { Box, Typography } from '@mui/material';
import { CardControlButtons } from 'components/CardControlButtons/CardControlButtons';
import React from 'react';
import { Board } from 'types/types';

export const BoardCard = ({ title, description }: Board) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        width: '20rem',
        height: '12rem',
        padding: '1rem',
        border: 'solid 0.1rem black',
        borderRadius: '1rem',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
      }}
    >
      <CardControlButtons />
      <Typography
        variant="h5"
        sx={{
          height: '4rem',
          width: '13rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: '2',
          WebkitBoxOrient: 'vertical',
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: '3',
          WebkitBoxOrient: 'vertical',
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};
