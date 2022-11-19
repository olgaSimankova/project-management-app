import { Box, Chip, MenuItem, OutlinedInput, Select } from '@mui/material';
import React from 'react';
import { AssigneeProps } from 'types/types';

export const Assignees = ({ all, selected, handleChange }: AssigneeProps) => {
  return (
    <Box>
      <Select
        value={selected}
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        label="Status"
        onChange={handleChange}
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
        {all.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};
