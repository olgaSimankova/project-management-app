import React, { useEffect } from 'react';
import { Box, Button, CircularProgress, Modal, Stack, TextField, Typography } from '@mui/material';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { BOARD_BUTTONS, BoardFormFields } from '../../types/types';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { addColumnSchema } from '../../schema/addColumnSchema';
import { addTaskSchema } from '../../schema/addTaskSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateColumnMutation } from '../../api/column.api';
import { useCreateTaskMutation } from '../../api/task.api';
import { useAppSelector } from '../../hooks/useAppSelector';

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
  boardId?: string;
  columnId?: string;
  columnsCount: number;
  open: boolean;
  tasksCount: number;
  onClose: () => void;
  pressedButtonId: string;
}

const ColumnAddModal = ({
  boardId = '',
  columnsCount,
  columnId,
  tasksCount,
  open,
  onClose,
  pressedButtonId,
}: ColumnAddModalProps) => {
  const { user } = useAppSelector((state) => state.userState);
  const isAddTask = pressedButtonId === BOARD_BUTTONS.ADD_TASK;
  const addModalSchema = isAddTask ? addTaskSchema : addColumnSchema;
  const [createColumn, { isSuccess, isLoading, reset: fetchReset }] = useCreateColumnMutation();
  const [createTask, { isSuccess: taskSuccess, isLoading: isTaskLoading, reset: taskReset }] =
    useCreateTaskMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BoardFormFields>({ resolver: yupResolver(addModalSchema) });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { title, description } = data;
    if (isAddTask) {
      createTask({
        boardId,
        columnId,
        title,
        description,
        order: tasksCount,
        userId: user?._id || '',
        users: [''],
      });
    } else {
      createColumn({ title, order: columnsCount, boardId });
    }
  };

  useEffect(() => {
    handleClose();
    fetchReset();
  }, [isSuccess]);

  useEffect(() => {
    handleClose();
    taskReset();
  }, [taskSuccess]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box onSubmit={handleSubmit(onSubmit)} component="form" sx={modalStyle}>
        <Typography variant="h6" component="h2" align="center">
          {isAddTask ? 'Add Task' : 'Create Column'}
        </Typography>
        <TextField
          {...register('title')}
          sx={inputStyle}
          margin="normal"
          label="Title"
          type="text"
          fullWidth={true}
          autoFocus={true}
          focused
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        {isAddTask && (
          <TextField
            {...register('description')}
            margin="normal"
            label="Description"
            type="text"
            fullWidth={true}
            multiline={true}
            minRows={3}
            maxRows={3}
            focused
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        )}
        <Stack mt={1} justifyContent="center" direction="row" spacing={5}>
          <Button
            type={'submit'}
            variant="contained"
            endIcon={
              isLoading || isTaskLoading ? (
                <CircularProgress size={16} color={'inherit'} />
              ) : (
                <CheckOutlinedIcon />
              )
            }
          >
            Confirm
          </Button>
          <Button onClick={handleClose} variant="contained" endIcon={<CloseOutlinedIcon />}>
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
export default ColumnAddModal;
