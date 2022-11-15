import { Box, Button, IconButton, TextareaAutosize, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { BoardFormFields, BoardFormProps } from 'types/types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { boardSchema } from 'schema/boardSchema';

export const BoardForm = ({ option, onClick, onSubmit }: BoardFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BoardFormFields>({
    resolver: yupResolver(boardSchema),
  });
  return (
    <Box>
      <Box
        onClick={onClick}
        data-id="close"
        className="top-level"
        sx={{
          position: 'fixed',
          zIndex: 1,
          top: '0',
          left: '0',
          width: '100vw',
          height: '100vh',
          background: '#333333',
          opacity: '0.5',
        }}
      ></Box>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          display: 'flex',
          position: 'absolute',
          top: '30vh',
          left: '27vw',
          zIndex: '2',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
          minWidth: '300px',
          width: '50vw',
          padding: '1rem',
          background: 'white',
          borderRadius: '1rem',
        }}
      >
        <Typography variant="h5">
          {`${option.slice(0, 1).toUpperCase()}${option.slice(1)}`} project
        </Typography>
        <TextField
          {...register('title')}
          name="title"
          id="title"
          type="text"
          autoFocus
          error={!!errors.title}
          helperText={errors.title?.message}
          label="Title"
          variant="outlined"
          sx={{ width: '80%' }}
        />
        <TextField
          {...register('description')}
          name="description"
          id="description"
          type="text"
          error={!!errors.description}
          helperText={errors.description?.message}
          maxRows={6}
          minRows={6}
          placeholder="Description"
          label="Description"
          multiline
          style={{ width: '80%' }}
        />
        <Button type="submit" color="success" variant="contained">
          {option}
        </Button>
        <IconButton
          onClick={(e) => onClick(e)}
          className="top-level"
          aria-label="close"
          color="error"
          data-id="close"
          sx={{
            position: 'absolute',
            top: '0',
            right: '0',
            width: '3rem',
            height: '3rem',
            background: 'white',
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
