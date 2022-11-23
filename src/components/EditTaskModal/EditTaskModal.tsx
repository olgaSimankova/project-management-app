import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Button, Grid, IconButton, Stack, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#eef2f9',
  boxShadow: 24,
  p: '20px 25px',
  borderRadius: '10px',
};

const inputStyle = {
  '& .MuiInputBase-root': {
    height: '45px',
  },
};

const editStyles = {
  backgroundColor: '#707090',
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(112, 112, 144, 0.9)',
  },
};

interface EditTaskModalProps {
  open: boolean;
  onClose: () => void;
}

const EditTaskModal = ({ open, onClose }: EditTaskModalProps) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Grid sx={style}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={2} alignItems="center">
              <AssignmentIcon sx={{ color: '#707090', mr: 1 }} />
              <Typography color="#707090" variant="h6" component="h2">
                Edit task
              </Typography>
            </Stack>
            <IconButton size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <TextField sx={inputStyle} fullWidth margin="normal" label="Title" type="text" />
          <TextField
            fullWidth
            multiline
            margin="normal"
            label="Description"
            type="text"
            minRows={3}
            maxRows={3}
          />
          <Button sx={editStyles} fullWidth>
            Confirm edit
          </Button>
        </Grid>
      </Fade>
    </Modal>
  );
};

export default EditTaskModal;
