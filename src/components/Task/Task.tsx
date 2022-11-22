import React from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';

const boxStyles = {
  '&.MuiBox-root': {
    boxShadow: '0 0 8px rgb(0 0 0 / 25%)',
  },
  width: '280px',
  marginTop: '10px',
  padding: '5px 5px 5px 10px',
  borderRadius: '7px',
  backgroundColor: 'white',
  wordBreak: 'break-all',
  cursor: 'pointer',
};

const titleStyles = {
  background: 'linear-gradient(90deg, #9ea7fc 17%, #6eb4f7 83%)',
  p: '0px 10px',
  borderRadius: '3px',
};

const respStyles = {
  background: 'linear-gradient(138.6789deg, #81d5ee 17%, #7ed492 83%)',
  p: '0px 3px',
  borderRadius: '3px',
};

const addRespStyles = {
  '&.MuiButtonBase-root': {
    color: '#b7bec7',
    width: '25px',
    height: '25px',
    border: '1px dashed #b7bec7',
    borderRadius: '50px',
  },
};

const Task = () => {
  return (
    <Grid sx={boxStyles}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box sx={titleStyles}>
          <Typography color="white" sx={{ lineHeight: 1.3 }}>
            Title
          </Typography>
        </Box>
        <IconButton size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <Typography color="#707090" fontSize="14px">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur culpa deserunt nobis
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box sx={respStyles}>
          <Typography color="white" fontSize="13px">
            Responsible:
          </Typography>
        </Box>
        <IconButton sx={addRespStyles} size="small">
          <SearchSharpIcon sx={{ fontSize: '17px' }} />
        </IconButton>
      </Box>
    </Grid>
  );
};

export default Task;
