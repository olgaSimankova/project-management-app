import { Box, Button, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import React from 'react';
import bgError from '../../assets/img/bgError.jpg';
import { FallbackProps } from 'react-error-boundary';

const styles = {
  pageContainer: {
    height: '100vh',
    maxWidth: '100%',
    backgroundImage: `url(${bgError})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
};

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { t } = useTranslation();
  return (
    <Container sx={styles.pageContainer} maxWidth={false}>
      <Typography variant="h2">{t('somethingWrong')}</Typography>
      <Typography variant="h3">{error?.message || ''}</Typography>
      <Box>
        <Button onClick={resetErrorBoundary}>{t('tryAgain')}</Button>
        <Button>{t('goMain')}</Button>
      </Box>
    </Container>
  );
};
