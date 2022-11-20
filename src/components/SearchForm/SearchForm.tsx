import { Button, Chip, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export const SearchForm = () => {
  const names = ['1', '2', '3', '4'];
  return (
    <Box
      sx={{
        maxWidth: '30rem',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      <TextField
        name="search"
        id="search"
        type="text"
        autoFocus
        variant="outlined"
        placeholder="serch in task titles or description"
        sx={{ width: '80%', borderRadius: '3rem' }}
      />
      <Select
        value={['1', 'efdafs', 'fdfsdfsd']}
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        label="Status"
        multiple
        sx={{ width: '80%' }}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected: string[]) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {names.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
      <Button type="submit" color="success" variant="contained">
        Search
      </Button>
    </Box>
  );
};