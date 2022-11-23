import React from 'react';
import { Box, Button } from '@mui/material';
import { LINKS, PAGES } from '../../constants/constants';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const NavLinks = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const value = (e.target as HTMLElement).dataset.id;
    if (value && PAGES.includes(value)) {
      navigate(LINKS[(value.slice(0, 1).toLowerCase() + value.slice(1)) as keyof typeof LINKS]);
    }
  };

  return (
    <Box m="0 auto" onClick={handleClick}>
      {PAGES.map((page) => (
        <Button key={page} sx={{ color: 'white' }} data-id={page}>
          {t(page)}
        </Button>
      ))}
    </Box>
  );
};

export default NavLinks;
