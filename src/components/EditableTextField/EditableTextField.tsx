import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import { UserFields } from 'types/types';

interface EditableTextFieldProps {
  defaultValue: string;
  isDisabled: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, tag: string) => void;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    tag: string
  ) => void;
  tag: 'name' | 'password' | 'login';
  register: UseFormRegister<UserFields>;
  errors: Partial<
    FieldErrorsImpl<{
      name: string;
      login: string;
      password: string;
    }>
  >;
}

export const EditableTextField = ({
  defaultValue,
  isDisabled,
  onClick,
  onInputChange,
  tag,
  register,
  errors,
}: EditableTextFieldProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={(e) => onClick(e, tag)}>
      <TextField
        {...register(tag)}
        label={tag}
        name={tag}
        value={defaultValue}
        placeholder="******"
        disabled={isDisabled}
        onChange={(e) => onInputChange(e, tag)}
        error={!!errors[tag]}
        helperText={errors[tag]?.message}
      />
      <Button
        variant="text"
        className="top-level"
        data-id={`${isDisabled ? 'edit' : 'done'}-${tag}`}
        startIcon={
          isDisabled ? (
            <EditIcon color="info" sx={{ marginLeft: '0.5rem' }} />
          ) : (
            <DoneOutlineIcon color="success" sx={{ marginLeft: '0.5rem' }} />
          )
        }
      />
    </Box>
  );
};
