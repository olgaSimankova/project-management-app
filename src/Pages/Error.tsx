import { Button, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { LINKS } from 'constants/constants';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import bgError from '../assets/img/bgError-2.jpg';

const styles = {
  pageContainer: {
    height: 'calc(100vh - 114px)',
    backgroundColor: '#627296',
  },
  imageContainer: {
    width: '70%',
    height: '50%',
    position: 'relative',
    display: 'block',
    margin: '2vh auto',
    backgroundImage: `url(${bgError})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  goToMainBtn: {
    display: 'block',
    margin: '0 auto',
  },
};

export const ErrorPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const resetClickHandler = () => {
    navigate(LINKS.welcome);
  };

  useEffect(() => {
    navigate(LINKS.error);
  }, [navigate]);

  return (
    <Container sx={styles.pageContainer} maxWidth={false}>
      <Typography variant="h2" sx={{ color: '#fff' }}>
        {t('somethingWrong')}
      </Typography>
      <Container sx={styles.imageContainer}></Container>
      <Button variant="contained" sx={styles.goToMainBtn} onClick={resetClickHandler}>
        {t('goMain')}
      </Button>
    </Container>
  );
};
