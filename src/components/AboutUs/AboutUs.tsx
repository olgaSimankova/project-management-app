import { Avatar, Box, Container, Theme, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import sasha from '../../assets/img/sasha.jpg';
import dima from '../../assets/img/dima.jpg';
import aleh from '../../assets/img/aleh.jpg';
import olya from '../../assets/img/olya.jpg';
import { useUserSystemTheme } from 'hooks/useUserSystemTheme';

const AboutUs = () => {
  const { t } = useTranslation();
  const { userTheme } = useUserSystemTheme();

  const createStyles = (theme: Theme) => ({
    teamContainer: {
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    },
    avatar: {
      width: 100,
      height: 100,
      [theme.breakpoints.between('xs', 'sm')]: {
        width: 70,
        height: 70,
      },
    },
    teamItem: {
      display: 'flex',
      gap: '10%',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.down('md')]: {
        gap: '5%',
      },
    },
    textName: {
      textAlign: 'center',
      [theme.breakpoints.down('md')]: {
        fontSize: '1.5rem',
      },
    },
    text: {
      [theme.breakpoints.down('md')]: {
        fontSize: '1rem',
        textAlign: 'justify',
      },
    },
  });

  const styles = createStyles(userTheme as Theme);

  const theBestDevelopersEver = ['Sasha', 'Dima', 'Olya', 'Aleh'];
  const avatars = [sasha, dima, olya, aleh];

  return (
    <Container sx={styles.teamContainer}>
      {theBestDevelopersEver.map((name, idx) =>
        idx % 2 ? (
          <Box sx={styles.teamItem} key={name}>
            <Box>
              <Avatar src={avatars[idx]} sx={styles.avatar}></Avatar>
              <Typography variant="h4" sx={styles.textName}>
                {t(`name${name}`)}
              </Typography>
            </Box>
            <Typography variant="h6" sx={styles.text}>
              {t(`about${name}`)}
            </Typography>
          </Box>
        ) : (
          <Box sx={styles.teamItem} key={name}>
            <Typography variant="h6" sx={styles.text}>
              {t(`about${name}`)}
            </Typography>
            <Box>
              <Avatar src={avatars[idx]} sx={styles.avatar}></Avatar>
              <Typography variant="h4" sx={styles.textName}>
                {t(`name${name}`)}
              </Typography>
            </Box>
          </Box>
        )
      )}
    </Container>
  );
};

export default AboutUs;
