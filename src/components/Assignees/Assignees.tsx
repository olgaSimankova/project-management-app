import { Box, Chip, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import React from 'react';
import { AssigneeProps } from 'types/types';

export const Assignees = ({ all, selected, handleChange, id, onClose }: AssigneeProps) => {
  return (
    <Box>
      <InputLabel variant="standard" htmlFor="chip">
        Assignees
      </InputLabel>
      <Select
        value={selected}
        labelId="demo-multiple-chip-label"
        id="chip"
        label="Status"
        className="assignees"
        onChange={(e) => (handleChange ? handleChange(e, id) : '')}
        onClose={(e) => (onClose ? onClose(e, id) : '')}
        multiple
        sx={{ width: '100%', backgroundColor: '#cccccc', border: '1px solid #cccccc' }}
        input={
          <OutlinedInput
            id="select-multiple-chip"
            label="Chip"
            sx={{ border: '0px solid white' }}
          />
        }
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
