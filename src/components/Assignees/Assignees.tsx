import { Box, Chip, MenuItem, OutlinedInput, Select } from '@mui/material';
import React from 'react';
import { AssigneeProps } from 'types/types';

export const Assignees = ({ all, selected, handleChange, id, onClose }: AssigneeProps) => {
  return (
    <Box>
      <Select
        value={selected}
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        label="Status"
        onChange={(e) => (handleChange ? handleChange(e, id) : '')}
        onClose={() => (onClose ? onClose(id) : '')}
        multiple
        sx={{ width: '100%', height: '3rem' }}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected: string[]) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {all.map(({ login }) => (
          <MenuItem key={login} value={login}>
            {login}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};
