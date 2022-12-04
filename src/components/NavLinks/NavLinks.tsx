import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { PAGES } from '../../constants/constants';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditTaskModal from '../EditTaskModal/EditTaskModal';

const NavLinks = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      alignItems="left"
      gap="1rem"
      m="0 auto"
      p="0 5px"
    >
      <Stack
        sx={{ cursor: 'pointer' }}
        direction="row"
        alignItems="center"
        onClick={() => setOpen(true)}
      >
        <AddIcon fontSize="small" />
        <Typography>Create board</Typography>
      </Stack>
      {PAGES.map((page) => (
        <NavLink
          to={`/${page.toLowerCase()}`}
          style={({ isActive }) => ({
            color: 'white',
            textDecoration: isActive ? 'underline' : 'none',
            fontWeight: isActive ? '900' : '500',
          })}
          key={page}
          data-id={page}
        >
          {t(page)}
        </NavLink>
      ))}
      <EditTaskModal
        title=""
        order={0}
        description=""
        open={open}
        boardId=""
        columnId=""
        taskId=""
        onClose={handleClose}
        assignees={[]}
      />
    </Box>
  );
};

export default NavLinks;
