import { Box, Link, Typography } from '@mui/material';
import React from 'react';
import { ReactComponent as Logo } from '../../assets/icons/RSLogo.svg';
import { OUR_GITHUB_NICKNAMES, REACT_COURSE_LINK } from 'constants/constants';
import { GithubPanel } from 'components/GithubPanel/GithubPanel';

export const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: '40px',
        flexWrap: 'wrap',
      }}
    >
      <Link href={REACT_COURSE_LINK}>
        <Logo />
      </Link>
      <Typography variant="h6">2022</Typography>
      <GithubPanel nicknames={OUR_GITHUB_NICKNAMES} />
    </Box>
  );
};
