import { Box, Link, SvgIcon, Typography } from '@mui/material';
import { GITHUB_BASE } from 'constants/constants';
import React from 'react';
import { ReactComponent as Github } from '../../assets/icons/github.svg';

const GithubLine = ({ nickname }: { nickname: string }) => {
  return (
    <Link
      underline="hover"
      href={`${GITHUB_BASE}/${nickname}`}
      sx={{ display: 'flex', justifyContent: 'center', gap: '0.1rem', flexWrap: 'wrap' }}
    >
      <SvgIcon>
        <Github />
      </SvgIcon>
      <Typography>{nickname}</Typography>
    </Link>
  );
};

export const GithubPanel = ({ nicknames }: { nicknames: string[] }) => {
  return (
    <Box sx={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
      {nicknames.map((nickname) => (
        <GithubLine key={`github-${nickname}`} nickname={nickname} />
      ))}
    </Box>
  );
};
