import React from 'react';
import { Menu, MenuItem, Typography } from '@mui/material';
import { USER_SETTINGS } from '../../constants/constants';

interface IUserMenu {
  anchorEl: null | HTMLElement;
  onClose: () => void;
}

const UserMenu = ({ anchorEl, onClose }: IUserMenu) => {
  return (
    <Menu
      sx={{ mt: '45px' }}
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      {USER_SETTINGS.map((setting) => (
        <MenuItem key={setting} onClick={onClose}>
          <Typography textAlign="center">{setting}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default UserMenu;
