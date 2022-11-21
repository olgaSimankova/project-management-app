import React from 'react';
import { Box, Button } from '@mui/material';
import { PAGES } from '../../constants/constants';
import { useTranslation } from 'react-i18next';

const NavLinks = () => {
  const { t } = useTranslation();
  return (
    <Box m="0 auto">
      {PAGES.map((page) => (
        <Button key={page} sx={{ color: 'white' }}>
          {t(page)}
        </Button>
      ))}
    </Box>
  );
};

export default NavLinks;
