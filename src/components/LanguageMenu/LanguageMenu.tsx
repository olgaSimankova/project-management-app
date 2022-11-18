import React from 'react';
import { Menu, MenuItem, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ILanguageMenu {
  anchorEl: null | HTMLElement;
  onClose: () => void;
}

const LanguageMenu = ({ anchorEl, onClose }: ILanguageMenu) => {
  const { i18n } = useTranslation();

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const handleClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    changeLang(target.id);
    onClose();
  };

  return (
    <Menu
      sx={{ mt: '45px' }}
      id="lang-menu"
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
      <MenuItem id="en" onClick={(e) => handleClick(e)}>
        <Typography id="en" textAlign="center">
          en
        </Typography>
      </MenuItem>
      <MenuItem id="ru" onClick={(e) => handleClick(e)}>
        <Typography id="ru" textAlign="center">
          ru
        </Typography>
      </MenuItem>
    </Menu>
  );
};

export default LanguageMenu;
