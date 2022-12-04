import {
  Box,
  Chip,
  FormControl,
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
}

export const StatusChip = ({ all, selected, onChange }: StatusProps) => {
  return (
    <FormControl>
      <InputLabel htmlFor="chip">Columns</InputLabel>
      <Select
        sx={{ width: '100px' }}
        value={selected}
        labelId="demo-multiple-chip-label"
        id="chip"
        label="Columns"
        className="Columns"
        disabled={!all.length}
        onChange={onChange}
        multiple
        input={
          <OutlinedInput
            id="select-multiple-chip"
            label="Columns"
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
    </FormControl>
  );
};
