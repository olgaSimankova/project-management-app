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

  const buttonStyles = {
    background: 'transparent',
    padding: 0,
    boxShadow: 'none',
  };

  return (
    <Box m="0 auto" onClick={handleClick}>
      {PAGES.map((page) => (
        <Button key={page} sx={buttonStyles} data-id={page}>
          {t(page)}
        </Button>
      ))}
    </Box>
  );
};

export default NavLinks;
