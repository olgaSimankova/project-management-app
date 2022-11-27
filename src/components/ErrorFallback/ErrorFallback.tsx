import { Button, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import React from 'react';
import bgError from '../../assets/img/bgError-2.jpg';
import { FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import { LINKS } from 'constants/constants';

const styles = {
  pageContainer: {
    height: '100vh',
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

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  console.error('ErrorFallback', error);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const resetClickHandler = () => {
    resetErrorBoundary();
    navigate(LINKS.welcome);
  };

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
