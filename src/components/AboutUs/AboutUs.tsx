import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import sasha from '../../assets/img/sasha.jpg';
import dima from '../../assets/img/dima.jpg';
import aleh from '../../assets/img/aleh.jpg';
import olya from '../../assets/img/olya.jpg';

const AboutUs = () => {
  const { t } = useTranslation();

  const styles = {
    avatar: {
      width: 100,
      height: 100,
    },
    flexBox: {
      display: 'flex',
      gap: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  return (
    <>
      <Box style={styles.flexBox}>
        <Box>
          <Avatar src={sasha} style={styles.avatar}></Avatar>
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            {t('teamSasha')}
          </Typography>
        </Box>
        <Typography variant="h6">{t('aboutSasha')}</Typography>
      </Box>
      <Box style={styles.flexBox}>
        <Typography variant="h6">{t('aboutDima')}</Typography>
        <Box>
          <Avatar src={dima} style={styles.avatar}></Avatar>
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            {t('teamDima')}
          </Typography>
        </Box>
      </Box>
      <Box style={styles.flexBox}>
        <Box>
          <Avatar src={olya} style={styles.avatar}></Avatar>
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            {t('teamOlya')}
          </Typography>
        </Box>
        <Typography variant="h6">{t('aboutOlya')}</Typography>
      </Box>
      <Box style={styles.flexBox}>
        <Typography variant="h6">{t('aboutAleh')}</Typography>
        <Box>
          <Avatar src={aleh} style={styles.avatar}></Avatar>
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            {t('teamAleh')}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default AboutUs;
