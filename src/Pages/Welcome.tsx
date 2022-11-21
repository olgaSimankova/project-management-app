import { Box, Button, Container, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import AboutUs from 'components/AboutUs/AboutUs';
import UsedTechnologies from 'components/UsedTechnologies/UsedTechnologies';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { themeLight } from 'theme/themeLight';
import bgLight from '../assets/img/bgLight.png';

const styles = {
  paperContainer: {
    height: 680,
    backgroundImage: `url(${bgLight})`,
    backgroundRepeat: 'no-repeat',
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

export const Welcome = () => {
  const { t } = useTranslation();

  return (
    <ThemeProvider theme={themeLight}>
      <CssBaseline />
      <main>
        <Container sx={styles.paperContainer} maxWidth={false}>
          <Typography variant="h1" gutterBottom>
            Project Management App
          </Typography>
          <Container sx={styles.heroContainer} maxWidth={false}>
            <Box sx={styles.heroContainer}>
              <Typography variant="h5">{t('welcomeHero')}</Typography>
            </Box>
            <Button variant="contained">{t('heroAboutBtn')}</Button>
          </Container>
        </Container>
        <Container sx={styles.aboutUsCintainer} maxWidth={false}>
          <Typography variant="h2">{t('teamHeading')}</Typography>
          <AboutUs />
        </Container>
        <Container>
          <Typography variant="h2">{t('usedTechnologies')}</Typography>
          <UsedTechnologies />
        </Container>
      </main>
    </ThemeProvider>
  );
};
