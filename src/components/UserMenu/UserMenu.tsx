import React from 'react';
import { Menu, MenuItem, Typography } from '@mui/material';
import { LOGOUT, USER_SETTINGS } from '../../constants/constants';
import { useAppDispatch } from '../../App/state/store';
import { logout } from '../../features/authSlice';

interface IUserMenu {
  anchorEl: null | HTMLElement;
  onClose: () => void;
}

const UserMenu = ({ anchorEl, onClose }: IUserMenu) => {
  const dispatch = useAppDispatch();

  const handleClose = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;

    if (target.innerHTML === LOGOUT) {
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
        <MenuItem key={setting} onClick={(e) => handleClose(e)}>
          <Typography textAlign="center">{setting}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default UserMenu;
