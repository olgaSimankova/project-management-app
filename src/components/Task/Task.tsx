import React from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import EditTaskModal from '../EditTaskModal/EditTaskModal';
import { useDeleteTaskMutation } from '../../api/task.api';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { QUESTION_ON_DELETE } from '../../constants/constants';
import { toast } from 'react-toastify';
import { Error } from '../../types/types';

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

interface ITaskProps {
  id?: string;
  boardId?: string;
  columnId?: string;
  title: string;
  description: string;
}

const Task = ({ id, boardId, columnId, title, description }: ITaskProps) => {
  const [deleteTask, { isError, error }] = useDeleteTaskMutation();
  const [open, setOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = () => {
    deleteTask({ boardId, columnId, taskId: id });
  };

  if (isError) {
    toast.error((error as Error).data.message);
  }

  return (
    <>
      <Grid sx={boxStyles}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box sx={titleStyles}>
            <Typography color="white" sx={{ lineHeight: 1.3 }}>
              {title}
            </Typography>
          </Box>
          <IconButton onClick={() => setConfirmOpen(true)} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Typography color="#707090" fontSize="14px">
          {description}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box sx={respStyles}>
            <Typography color="white" fontSize="13px">
              Responsible:
            </Typography>
          </Box>
          <IconButton onClick={handleOpen} sx={addRespStyles} size="small">
            <SearchSharpIcon sx={{ fontSize: '17px' }} />
          </IconButton>
        </Box>
        <EditTaskModal open={open} onClose={handleClose} />
        {confirmOpen && (
          <ConfirmModal
            question={QUESTION_ON_DELETE}
            onYesClick={handleDelete}
            onNoClick={() => setConfirmOpen(false)}
          />
        )}
      </Grid>
    </>
  );
};

export default Task;
