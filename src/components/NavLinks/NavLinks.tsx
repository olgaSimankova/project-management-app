import React from 'react';
import { Box } from '@mui/material';
import { PAGES } from '../../constants/constants';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

const NavLinks = () => {
  const { t } = useTranslation();

  return (
    <Box display="flex" gap="1rem" m="0 auto">
      {PAGES.map((page) => (
        <NavLink
          to={`/${page.toLowerCase()}`}
          style={({ isActive }) => ({
            color: 'white',
            textDecoration: isActive ? 'underline' : 'none',
            fontWeight: isActive ? '900' : '500',
          })}
          key={page}
          data-id={page}
        >
          {t(page)}
        </NavLink>
      ))}
    </Box>
  );
};

export default NavLinks;
