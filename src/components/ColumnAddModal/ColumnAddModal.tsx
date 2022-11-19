import React from 'react';
import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { BOARD_BUTTONS } from '../../types/types';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 310,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
  borderRadius: '15px',
};

const inputStyle = {
  '& .MuiInputBase-root': {
    height: '45px',
  },
};

interface ColumnAddModalProps {
  open: boolean;
  onClose: () => void;
  pressedButtonId: string;
}

const ColumnAddModal = ({ open, onClose, pressedButtonId }: ColumnAddModalProps) => {
  const isAddTask = pressedButtonId === BOARD_BUTTONS.ADD_TASK;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" align="center">
          {isAddTask ? 'Add Task' : 'Create Column'}
        </Typography>
        <TextField
          sx={inputStyle}
          margin="normal"
          label="Title"
          type="text"
          fullWidth={true}
          required={true}
          autoFocus={true}
          focused
        />
        {isAddTask && (
          <TextField
            margin="normal"
            label="Description"
            type="text"
            fullWidth={true}
            required={true}
            multiline={true}
            minRows={3}
            maxRows={3}
            focused
          />
        )}
        <Stack mt={1} justifyContent="center" direction="row" spacing={5}>
          <Button variant="contained" endIcon={<CheckOutlinedIcon />}>
            Confirm
          </Button>
          <Button variant="contained" endIcon={<CloseOutlinedIcon />}>
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ColumnAddModal;
