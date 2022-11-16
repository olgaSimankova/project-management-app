import { Box, CardMedia, Paper, Typography } from '@mui/material';
import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import bgLight from '../assets/img/bgLight.png';

const styles = {
  paperContainer: {
    height: 680,
    backgroundImage: `url(${bgLight})`,
    backgroundRepeat: 'no-repeat',
  },
};

export const Welcome = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    i18n.changeLanguage('ru');
  };

  return (
    <Paper style={styles.paperContainer}>
      <button onClick={() => changeLanguage()}>RU</button>
      <Typography variant="h1">Project Management App</Typography>
      <div>{t('welcomeHero')}</div>
    </Paper>
  );
};
