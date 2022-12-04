import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AssigneeProps } from 'types/types';

export const Assignees = ({
  all,
  selected,
  handleChange,
  id,
  onClose,
  register,
  isDisabled = false,
}: AssigneeProps) => {
  const { t } = useTranslation();
  return (
    <FormControl fullWidth disabled={isDisabled}>
      <InputLabel htmlFor="chip">{t('assignees')}</InputLabel>
      <Select
        {...(register ? register('assigners') : null)}
        value={selected}
        labelId="demo-multiple-chip-label"
        id="chip"
        className="assignees"
        onChange={(e) => (handleChange ? handleChange(e, id) : '')}
        onClose={(e) => (onClose ? onClose(e, id) : '')}
        multiple
        sx={{ width: '95%' }}
        input={
          <OutlinedInput
            id="select-multiple-chip"
            label={t('assignees')}
            sx={{ border: '0px solid white' }}
          />
        }
        renderValue={(selected: string[]) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.2rem' }}>
            {selected.map((value) => (value ? <Chip key={value} label={value} /> : null))}
          </Box>
        )}
      >
        {all.map(({ login }) => (
          <MenuItem key={login} value={login}>
            {login}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
