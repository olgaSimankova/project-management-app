import React from 'react';
import { Box, Button } from '@mui/material';
import { PAGES } from '../../constants/constants';
import { useTranslation } from 'react-i18next';

const NavLinks = () => {
  const { t } = useTranslation();
  const buttonStyles = {
    background: 'transparent',
    padding: 0,
    boxShadow: 'none',
  };
  return (
    <Box m="0 auto">
      {PAGES.map((page) => (
        <Button key={page} sx={buttonStyles}>
          {t(page)}
        </Button>
      ))}
    </Box>
  );
};

export default NavLinks;
