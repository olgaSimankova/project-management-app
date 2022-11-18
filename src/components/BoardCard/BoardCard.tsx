import { Box, Typography } from '@mui/material';
import { CardControlButtons } from 'components/CardControlButtons/CardControlButtons';
import React from 'react';
import { BoardConfig } from 'types/types';

export const BoardCard = ({
  title,
  _id,
  onClick,
}: BoardConfig & {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => void;
}) => {
  const { title: newTitle, description } = JSON.parse(title);
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '18rem',
        height: '8rem',
        padding: '1rem',
        border: 'solid 0.1rem black',
        borderRadius: '1rem',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
      }}
    >
      <CardControlButtons id={_id || ''} onClick={(e) => onClick(e, _id || '')} />
      <Typography
        variant="h5"
        sx={{
          height: '2rem',
          width: '11rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {newTitle}
      </Typography>
      <Typography
        sx={{
          height: '3rem',
          width: '16rem',
          display: '-webkit-box',
          boxOrient: 'vertical',
          lineClamp: '2',
          wordBreak: 'break-all',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};
