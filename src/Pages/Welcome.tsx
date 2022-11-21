import { Box, Button, Container, Typography } from '@mui/material';
import AboutUs from 'components/AboutUs/AboutUs';
import UsedTechnologies from 'components/UsedTechnologies/UsedTechnologies';
import React from 'react';
import { useTranslation } from 'react-i18next';
import bgLight from '../assets/img/bgLight.png';
import bgDark from '../assets/img/bgDark.png';
import { useMain } from 'hooks/useMain';

export const Welcome = () => {
  const { theme } = useMain();

  const styles = {
    heroWrapper: {
      maxWidth: 1400,
      margin: '0 auto',
    },
    heroBG: {
      height: 680,
      backgroundImage: theme === 'light' ? `url(${bgLight})` : `url(${bgDark})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
    teamAndTechnologiesWrapper: {
      maxWidth: 1400,
      margin: '0 auto',
    },
    heroContainer: {
      width: 800,
      minHeight: 150,
    },
    aboutUsCintainer: {
      maxWidth: 1150,
      m: 0,
      paddingTop: '2rem',
    },
  };

  const { t } = useTranslation();

  return (
    <main>
      <Container sx={styles.heroBG} maxWidth={false}>
        <Box sx={styles.heroWrapper}>
          <Typography variant="h1" gutterBottom>
            Project Management App
          </Typography>
          <Container sx={styles.heroContainer} maxWidth={false}>
            <Box sx={styles.heroContainer}>
              <Typography variant="h5">{t('welcomeHero')}</Typography>
            </Box>
            <Button variant="contained">{t('heroAboutBtn')}</Button>
          </Container>
        </Box>
      </Container>
      <Box sx={styles.teamAndTechnologiesWrapper}>
        <Container sx={styles.aboutUsCintainer} maxWidth={false}>
          <Typography variant="h2">{t('teamHeading')}</Typography>
          <AboutUs />
        </Container>
        <Container>
          <Typography variant="h2">{t('usedTechnologies')}</Typography>
          <UsedTechnologies />
        </Container>
      </Box>
    </main>
  );
};
function interpolate(arg0: { inputRange: number[]; outputRange: string[] }) {
  throw new Error('Function not implemented.');
}
