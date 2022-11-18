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
    paddingTop: 100,
  },
  heroContainer: {
    width: 800,
    height: 150,
    marginleft: 0,
    padding: 0,
  },
  aboutUsCintainer: {
    width: 1150,
    margin: 0,
    padding: 25,
  },
};

export const Welcome = () => {
  const { t, i18n } = useTranslation();

  // const changeToRUS = () => {
  //   i18n.changeLanguage('ru');
  // };

  // const changeToRENG = () => {
  //   i18n.changeLanguage('en');
  // };

  return (
    <ThemeProvider theme={themeLight}>
      <CssBaseline />
      <main>
        <Container style={styles.paperContainer} maxWidth={false}>
          <Typography variant="h1" gutterBottom>
            Project Management App
          </Typography>
          <Container style={styles.heroContainer} maxWidth={false}>
            <Box style={styles.heroContainer}>
              <Typography variant="h5">{t('welcomeHero')}</Typography>
            </Box>
            <Button variant="contained">{t('heroAboutBtn')}</Button>
          </Container>
        </Container>
        <Container style={styles.aboutUsCintainer} maxWidth={false}>
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
