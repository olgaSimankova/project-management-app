import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { EditableTextFieldProps } from 'types/types';
import EditIcon from '@mui/icons-material/Edit';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

export const EditableTextField = ({
  defaultValue,
  isDisabled,
  handleClick,
  handleChange,
  tag,
  register,
  errors,
}: EditableTextFieldProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={(e) => handleClick(e, tag)}>
      <TextField
        {...register(tag)}
        label={tag}
        name={tag}
        value={defaultValue}
        placeholder="******"
        disabled={isDisabled}
        onChange={(e) => handleChange(e, tag)}
        error={!!errors[tag]}
        helperText={errors[tag]?.message}
      />
      {isDisabled ? (
        <Button
          variant="text"
          className="top-level"
          data-id={`edit-${tag}`}
          startIcon={<EditIcon color="info" sx={{ marginLeft: '0.5rem' }} />}
        />
      ) : (
        <Button
          variant="text"
          className="top-level"
          data-id={`done-${tag}`}
          startIcon={<DoneOutlineIcon color="success" sx={{ marginLeft: '0.5rem' }} />}
        />
      )}
    </Box>
  );
};
