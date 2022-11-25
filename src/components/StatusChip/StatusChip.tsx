import {
  Box,
  Chip,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React from 'react';

interface StatusProps {
  all: string[];
  selected: string[];
  onChange: (event: SelectChangeEvent<string[]>) => void;
  onClose: () => void;
}

export const StatusChip = ({ all, selected, onChange, onClose }: StatusProps) => {
  console.log(selected.length);
  return (
    <Box>
      <InputLabel variant="standard" htmlFor="chip">
        Statuses
      </InputLabel>
      <Select
        value={selected}
        labelId="demo-multiple-chip-label"
        id="chip"
        label="Status"
        className="assignees"
        onChange={onChange}
        onClose={onClose}
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
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.2rem' }}>
            {selected.map((value) => (value ? <Chip key={value} label={value} /> : null))}
          </Box>
        )}
      >
        {all.map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};
