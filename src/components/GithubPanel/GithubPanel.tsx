import { Box, Link, SvgIcon, Typography } from '@mui/material';
import { GITHUB_BASE } from 'constants/constants';
import React from 'react';
import { ReactComponent as Github } from '../../assets/icons/github.svg';

const GithubLine = (props: { nickname: string }) => {
  return (
    <Link
      underline="hover"
      href={`${GITHUB_BASE}/${props.nickname}`}
      sx={{ display: 'flex', justifyContent: 'center', gap: '5px', flexWrap: 'wrap' }}
    >
      <SvgIcon>
        <Github />
      </SvgIcon>
      <Typography>{props.nickname}</Typography>
    </Link>
  );
};

export const GithubPanel = (props: { nicknames: string[] }) => {
  return (
    <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {props.nicknames.map((nickname) => (
        <GithubLine key={`github-${nickname}`} nickname={nickname} />
      ))}
    </Box>
  );
};
