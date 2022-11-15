import React from 'react';
import { Box, IconButton, ListItem, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const listItemStyles = {
  '& .MuiListItemSecondaryAction-root': {
    right: '0',
  },
  '&.MuiListItem-root': {
    padding: '2px 48px 3px 10px',
  },
};

const boxStyles = {
  '&.MuiBox-root': {
    boxShadow: '0 0 8px rgb(0 0 0 / 25%)',
  },
  marginTop: '10px',
  borderRadius: '7px',
  backgroundColor: '#f9f7fa',
};

const Task = () => {
  return (
    <Box sx={boxStyles}>
      <ListItem
        sx={listItemStyles}
        secondaryAction={
          <IconButton size="medium" aria-label="delete">
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <ListItemText primary="first task" />
      </ListItem>
    </Box>
  );
};

export default Task;
