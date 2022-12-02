import { Box, Typography } from '@mui/material';
import { Assignees } from 'components/Assignees/Assignees';
import { CardControlButtons } from 'components/CardControlButtons/CardControlButtons';
import React from 'react';
import { BoardConfig } from 'types/types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { useTranslation } from 'react-i18next';

export const BoardCard = ({
  title,
  owner,
  _id = '',
  onClick,
  isEditing = false,
  isDeleting = false,
  users,
  onChangeAssignee,
  onClose,
  allUsers = [],
}: BoardConfig & {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => void;
}) => {
  const navigate = useNavigate();
  const { title: newTitle, description } = JSON.parse(title);
  const { user } = useAuth();
  const { t } = useTranslation();

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button') && target.nodeName !== 'LI') {
      navigate(`/main/${_id}`);
    }
  };

  const ownerAcc = allUsers.filter((user) => user._id === owner)[0];
  const selectedUsers = users.map((id) => allUsers.find((user) => id === user._id)?.login || '');

  return (
    <Box
      onClick={(e) => handleClick(e)}
      sx={{
        position: 'relative',
        display: 'flex',
        gap: '0.5rem',
        flexDirection: 'column',
        width: '24rem',
        height: 'fit-content',
        padding: '1rem',
        border: 'solid 0.1rem black',
        borderRadius: '1rem',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        cursor: 'pointer',
      }}
    >
      <CardControlButtons
        id={_id || ''}
        onClick={(e) => onClick(e, _id)}
        isDeleting={isDeleting}
        isEditing={isEditing}
      />
      <Typography
        variant="h5"
        sx={{
          height: '3rem',
          width: '20rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          paddingTop: '1rem',
        }}
      >
        {newTitle}
      </Typography>
      <Typography
        sx={{
          height: '3rem',
          width: '20rem',
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
      <Assignees
        all={allUsers}
        id={_id}
        selected={selectedUsers}
        handleChange={onChangeAssignee}
        onClose={onClose}
        isDisabled={ownerAcc?._id !== user?._id}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin: '0.3rem' }}>
        <Typography>
          {t('createdBy')} {ownerAcc?.login}
        </Typography>
      </Box>
    </Box>
  );
};
