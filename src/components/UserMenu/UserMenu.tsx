import React from 'react';
import { Menu, MenuItem, Typography } from '@mui/material';
import { LOGOUT, USER_SETTINGS } from '../../constants/constants';
import { logout } from '../../features/authSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';

interface IUserMenu {
  anchorEl: null | HTMLElement;
  onClose: () => void;
}

const UserMenu = ({ anchorEl, onClose }: IUserMenu) => {
  const dispatch = useAppDispatch();

  const handleClose = (event: React.MouseEvent) => {
    const target = event.currentTarget as HTMLElement;

    if (target.id === LOGOUT) {
      dispatch(logout());
    }

    onClose();
  };

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
        <MenuItem id={setting} key={setting} onClick={(e) => handleClose(e)}>
          <Typography textAlign="center">{setting}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default UserMenu;
