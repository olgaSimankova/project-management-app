import React from 'react';
import { Box, Modal, TextField, Typography } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface ColumnAddModalProps {
  open: boolean;
  onClose: () => void;
}

const ColumnAddModal = ({ open, onClose }: ColumnAddModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <TextField fullWidth={true} />
      </Box>
    </Modal>
  );
};

export default ColumnAddModal;
